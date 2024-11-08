import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable'
import Detailbox from './Detailbox'
import StatusGraph from './StatusGraph'
import { getStatusCount } from '../utils/getDataCounts'
import VendorGraph from './VendorGraph'
import CategoryGraph from './CategoryGraph'
import CategoryTable from './CategoryTable'
import WarehouseTable from './WarehouseTable'

function Dashboard() {
  const [statusCount,setStatusCount] = useState([])

  useEffect(()=>{
    setStatusCount(getStatusCount())
  },[])

  return (
    <div className='px-8'>
      <h3 className='text-4xl font-bold'>DASHBOARD</h3>
      <div className='my-8'>
        <OrderTable/>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8'>
          <Detailbox type={"Warehouses"} />
          <Detailbox type={"Categories"} />
          <Detailbox type={"Products"} />
          <Detailbox type={"Vendors"} />
          <Detailbox type={"Order Quantity"} />
          <Detailbox type={"Available Quantity"} />
        </div>
        <div className='bg-white rounded-md shadow-lg flex min-h-[8rem] overflow-hidden'>
          <div className='w-[50%] bg-blue-600 font-bold text-xl sm:text-3xl  p-5 text-white flex flex-col justify-between'>
            <h3 className='tracking-wide'>Shippped</h3>
            <p>{statusCount[0]}</p>
          </div>
          <div className='w-[50%]  bg-green-600 font-bold text-xl sm:text-3xl  p-5 text-white flex items-end  flex-col justify-between'>
            <h3 className='tracking-wide'>Recieved</h3>
            <p>{statusCount[1]}</p>
          </div>
        </div>
        <div>
          <StatusGraph />
          <VendorGraph/>
          <CategoryGraph/>
          <CategoryTable/>
          <WarehouseTable/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
