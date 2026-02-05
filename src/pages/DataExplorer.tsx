import { generateMockData, SalesData } from '@/data/mockDataExplorer'
import { memo, useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

const NO_OF_ROWS = 50000
const ROW_HIGHT = 72

const DataExplorer = () => {
  const [data] = useState(() => generateMockData(NO_OF_ROWS))

  // Parent ref for virtualizer - The scrollable element for your list
  const parentRef = useRef<HTMLDivElement>(null)

  // Setup virtualizer
  const virtualizer = useVirtualizer({
    count: NO_OF_ROWS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HIGHT, //Approx height of each row
    overscan: 10, // Render 5 etra items above/below viewport
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div className="">
      <h1 className="text-xl font-bold">Data Explorer Screen</h1>
      <p className="text-slate-600 mb-4">
        Showing {NO_OF_ROWS} sales transactions
      </p>
      <div
        ref={parentRef}
        className="border rounded-lg overflow-auto h-[550px] bg-white"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map(virtualizeItem => {
            const sale = data[virtualizeItem.index]
            return (
              <div
                key={virtualizeItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${ROW_HIGHT}px`,
                  transform: `translateY(${virtualizeItem.start}px)`,
                }}
                className="p-4 border-b hover:bg-slate-50 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{sale.id}</div>
                  <div className="text-sm text-slate-600">{sale.customer}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm">{sale.product}</div>
                  <div className="text-xs text-slate-500">{sale.region}</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-green-600">
                    {sale.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">{sale.date}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/*  */}
        {/* {data.map(sale => {
          return (
            <div
              key={sale.id}
              className="p-4 border-b hover:bg-slate-50 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{sale.id}</div>
                <div className="text-sm text-slate-600">{sale.customer}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm">{sale.product}</div>
                <div className="text-xs text-slate-500">{sale.region}</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-green-600">
                  {sale.amount.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500">{sale.date}</div>
              </div>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export default DataExplorer
