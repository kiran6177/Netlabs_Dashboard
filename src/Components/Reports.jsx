import React from 'react'
import CategoryAging from './CategoryAging'
import ProductAging from './ProductAging'
import Backorder from './Backorder'

function Reports() {


  return (
<div className='px-8'>
      <h3 className='text-4xl font-bold'>REPORTS</h3>
      <div className='my-8'>
        <CategoryAging/>
        <ProductAging/>
        <Backorder/>
      </div>
    </div>
  )
}

export default Reports
