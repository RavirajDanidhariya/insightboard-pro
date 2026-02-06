import { useEffect, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
  getSortedRowModel,
} from '@tanstack/react-table'
import { generateMockData, SalesData } from '@/data/mockDataExplorer'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearchParams } from 'react-router-dom'

const NO_OF_ROWS = 200
const ROW_OPTOINS = ['10', '25', '50', '100']
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const getPageNumbers = (current: number, total: number) => {
  const pages: (number | '...')[] = []
  const maxVisible = 5

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (current > 3) pages.push('...')

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
}

const dataExplorerColumns: ColumnDef<SalesData>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className="font-semibold text-green-600"> {formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-2.5 text-xs font-medium  ${status === 'completed' ? 'bg-green-100 text-green-800' : status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
        >
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
]

const validSortByIDs = ['id', 'customer', 'product', 'amount', 'status', 'date']

const validSortOrders = ['asc', 'desc'] as const

const DataExplorer = () => {
  const [data] = useState(() => generateMockData(NO_OF_ROWS))

  const [searchParams, setSearchParams] = useSearchParams()

  // Read form URL
  const pageParam = Number(searchParams.get('page') || DEFAULT_PAGE)
  const pageSizeParam = Number(
    searchParams.get('pageSize') || DEFAULT_PAGE_SIZE
  )
  const sortByParam = searchParams.get('sortBy') || ''
  const sortOrderParam = searchParams.get('sortOrder') || 'asc'

  const isValidSortBy = validSortByIDs.includes(sortByParam as any)
  const isValidSotOrder = validSortOrders.includes(sortOrderParam as any)

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (sortByParam && isValidSortBy && isValidSotOrder) {
      return [{ id: sortByParam, desc: sortOrderParam === 'desc' }]
    }
    return []
  })

  const pageSize = ROW_OPTOINS.includes(pageSizeParam.toString())
    ? pageSizeParam
    : 10

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const currentPage = clamp(pageParam, 1, totalPages)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(currentPage))
    params.set('pageSize', String(pageSize))

    if (sorting.length > 0) {
      params.set('sortBy', sorting[0].id)
      params.set('sortOrder', sorting[0].desc ? 'desc' : 'asc')
    } else {
      params.delete('sortBy')
      params.delete('sortOrder')
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true })
    }
  }, [currentPage, pageSize, searchParams, setSearchParams, sorting])

  // paginated data

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return data.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, data])

  const table = useReactTable({
    columns: dataExplorerColumns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    params.set('pageSize', String(pageSize))
    setSearchParams(params)
  }

  const updatePageSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    params.set('pageSize', String(newSize))
    setSearchParams(params)
  }

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Data Explorer Screen</h1>
        <p className="text-slate-600 mb-4">Basic TanStack Table</p>
      </div>

      <div className="border rounded h-[465px] overflow-auto  ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-slate-700 sticky bg-slate-300 top-0 z-10 cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </TableHead>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white  p-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700">
            Rows per page:
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={value => updatePageSize(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROW_OPTOINS.map(size => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }
                  onClick={() => {
                    updatePage(Math.max(0, currentPage - 1))
                  }}
                ></PaginationPrevious>
              </PaginationItem>

              {getPageNumbers(currentPage, totalPages).map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => updatePage(page)}
                      isActive={currentPage === page}
                    >
                      {page as number}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                  onClick={() => {
                    updatePage(Math.min(totalPages, currentPage + 1))
                  }}
                ></PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default DataExplorer
