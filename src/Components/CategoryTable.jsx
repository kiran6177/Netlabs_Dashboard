import React, { useMemo } from 'react'
import { availableQuantity, getCategoryOrders, orderQuantity } from '../utils/getCategoryData'

function CategoryTable() {
    const data = useMemo(()=>getCategoryOrders(),[])

  return (
<div className='bg-white rounded-md w-full p-5 my-5 shadow-lg'>
      <h2 className="text-3xl font-semibold">Category Insights</h2>
        <table className='table-fixed w-full rounded-md my-5'>
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
  )
}

export default CategoryTable
