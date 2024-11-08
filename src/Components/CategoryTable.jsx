import React, { useMemo, useRef } from 'react'
import { availableQuantity, getCategoryOrders, orderQuantity } from '../utils/getCategoryData'
import { downloadExcel } from '../utils/xlsx';

function CategoryTable() {
    const data = useMemo(()=>getCategoryOrders(),[])
    const tableRef = useRef();

    const handleDownload = ()=>{
        console.log(tableRef.current);
        let colWidth = [30,20,20]
        downloadExcel(tableRef.current,colWidth,"Category_Data")
    }
  return (
<div className='bg-white rounded-md w-full p-5 my-5 shadow-lg'>
    <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:items-center'>
      <h2 className="text-xl sm:text-3xl font-semibold">Category Insights</h2>
      <button type='button' onClick={handleDownload} className='border-2 border-[#5A57FE] rounded-md px-6 py-1' >Download</button>
      </div>
        <div className='w-full overflow-x-scroll scroll-element'>
        <table ref={tableRef} className='min-w-[768px] table-fixed w-full rounded-md my-5'>
            <thead className='bg-[#ddd] h-[3rem]'>
                <tr className='border-l-2 border-r-2 border-b-2'>
                    <th className='border-r-2 border-[#c6c6c6] w-[45%]'>Category</th>
                    <th className='border-r-2 border-[#c6c6c6]'>Total Order Quantity</th>
                    <th >Total Order Quantity</th>
                </tr>
            </thead>
            <tbody className='bg-[#fdfdfd]'>
            {
                Object.entries(data).map(([name,dataObj])=>{
                    return (
                    <tr key={name} className='border-l-2 border-r-2 border-b-2 '>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{name}</td>
                        <td className='border-r-2 border-[#c6c6c6] text-center py-2'>{dataObj[availableQuantity]}</td>
                        <td className='text-center py-2'>{dataObj[orderQuantity]}</td>
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

export default CategoryTable
