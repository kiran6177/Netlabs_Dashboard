import React, { useMemo } from 'react'
import { availableQuantity, orderQuantity, shipped } from '../utils/getCategoryData'
import { getWarehouseOrders, recieved } from '../utils/getWarehouseData'

function WarehouseTable() {
    const data = useMemo(()=>getWarehouseOrders(),[])

  return (
<div className='bg-white rounded-md w-full p-5 my-5 shadow-lg'>
      <h2 className="text-3xl font-semibold">Warehouse Insights</h2>
        <table className='table-fixed w-full rounded-md my-5'>
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
  )
}

export default WarehouseTable
