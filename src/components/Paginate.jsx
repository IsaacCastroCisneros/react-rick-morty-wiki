import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Paginate({pageRange,params,updateParams}) {

  console.log(params)
  return (
    <ReactPaginate className='flex'
    pageCount={pageRange || 0}
    onPageChange={e=>updateParams({page:`page=${e.selected+1}`})}
    activeClassName='text-red-500'
    forcePage={params-1 || 0}
    renderOnZeroPageCount={null}
   />
  )
}
