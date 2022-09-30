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
    <ReactPaginate
      className="flex items-center mt-[3.5rem]"
      pageCount={pageRange || 0}
      onPageChange={pageChange}
      activeLinkClassName="rounded-[.4rem] text-white bg-link"
      pageLinkClassName='px-[.8rem] py-[.4rem]'
      nextClassName='px-[1rem] hover:text-link'
      previousClassName='px-[1rem] hover:text-link'
      nextLabel='Next >'
      previousLabel='< Previous'
      forcePage={page}
      renderOnZeroPageCount={null}
    />
  );
}
