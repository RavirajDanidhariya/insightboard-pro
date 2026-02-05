import { useState } from 'react'
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

const NO_OF_ROWS = 50

const DataExplorer = () => {
  const [data] = useState(() => generateMockData(NO_OF_ROWS))

  const [sorting, setSorting] = useState<SortingState>([])

  const dataExplorerColumns: ColumnDef<SalesData>[] = [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('id')}</div>
      ),
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

  const table = useReactTable({
    columns: dataExplorerColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Data Explorer Screen</h1>
        <p className="text-slate-600 mb-4">Basic TanStack Table</p>
      </div>

      <div className="border rounded">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-slate-700"
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
    </div>
  )
}

export default DataExplorer
