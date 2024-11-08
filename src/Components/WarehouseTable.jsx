import React, { useMemo, useRef } from 'react'
import { availableQuantity, orderQuantity, shipped } from '../utils/getCategoryData'
import { getWarehouseOrders, recieved } from '../utils/getWarehouseData'
import { downloadExcel } from '../utils/xlsx';

function WarehouseTable() {
    const data = useMemo(()=>getWarehouseOrders(),[])
    const tableRef = useRef();

    const handleDownload = ()=>{
        console.log(tableRef.current);
        let colWidth = [30,20,20,15,15]
        downloadExcel(tableRef.current,colWidth,"Warehouse_Data")
    }

  return (
<div className='bg-white rounded-md w-full p-5 my-5 shadow-lg'>
        <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:items-center'>
        <h2 className="text-xl sm:text-3xl font-semibold">Warehouse Insights</h2>
        <button type='button' onClick={handleDownload} className='border-2 border-[#5A57FE] rounded-md px-6 py-1' >Download</button>
        </div>
        <div className='w-full overflow-x-scroll scroll-element'>
        <table ref={tableRef} className='min-w-[768px] table-fixed w-full rounded-md my-5'>
            <thead className='bg-[#ddd] h-[3rem]'>
                <tr className='border-l-2 border-r-2 border-b-2'>
                    <th className='border-r-2 border-[#c6c6c6] w-[30%]'>Warehouse</th>
                    <th className='border-r-2 border-[#c6c6c6] w-[20%]'>Total Available Quantity</th>
                    <th className='border-r-2 border-[#c6c6c6] w-[20%]'>Total Order Quantity</th>
                    <th className='border-r-2 border-[#c6c6c6]'>Shipped</th>
                    <th >Recieved</th>
                </tr>
            </thead>
            <tbody className='bg-[#fdfdfd]'>
            {
                Object.entries(data).map(([name,dataObj])=>{
                    return (
                    <tr key={name} className='border-l-2 border-r-2 border-b-2 '>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{name}</td>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{dataObj[availableQuantity]}</td>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{dataObj[orderQuantity]}</td>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{dataObj[shipped]}</td>
                        <td className='text-center py-2'>{dataObj[recieved]}</td>
                    </tr>
                    )
                })        
            }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default WarehouseTable
