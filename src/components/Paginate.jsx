import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Paginate(props) {
 
  const{
    pageRange,
    page,
    updateParams,
    setPage
  }=props


  function pageChange(e)
  {
    updateParams({page:e.selected+1})
    setPage(e.selected)
  }
  
  return (
    <ReactPaginate className='flex'
    pageCount={pageRange || 0}
    onPageChange={pageChange}
    activeClassName='text-red-500'
    forcePage={page}
    renderOnZeroPageCount={null}
   />
  )
}
