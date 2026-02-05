import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table'
import { generateMockData, SalesData } from '@/data/mockDataExplorer'

const NO_OF_ROWS = 50

const DataExplorer = () => {
  const [data] = useState(() => generateMockData(NO_OF_ROWS))

  const dataExplorerColumns: ColumnDef<SalesData>[] = [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
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
    },
    {
      accessorKey: 'status',
      header: 'Status',
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
  })

  return (
    <div className="">
      <h1 className="text-xl font-bold">Data Explorer Screen</h1>
      <p className="text-slate-600 mb-4">Basic TanStack Table</p>
      <div className="border rounded p-4">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        key={header.id}
                        className="border p-2 bg-slate-100 text-left"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className="border p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataExplorer
