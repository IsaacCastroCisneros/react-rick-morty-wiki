import React from 'react'
import Paginate from './Paginate'
import Spinner from './Spinner'

import Card from './Card'
import useFetch from '../custom-hooks/useFetch'

export default function ByPagination(props) 
{
  const{
    url,
    page,
    setPage,
    updateParams
  }=props

  const{data:characters,isFetching,notFound}=useFetch(url,'none')

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-[1rem] gap-y-[3rem]">
        {characters?.results?.map((char) => {
          return <Card {...char} key={char.id} isFetching={isFetching} />;
        })}
      </div>
      {
        notFound&&<span className='w-[100%] block'>nothing here :( search another thing</span>
      }
      <Paginate
        pageRange={characters?.info?.pages}
        page={page}
        setPage={setPage}
        updateParams={updateParams}
      />
      {isFetching && (
        <Spinner
          css={{ position: "fixed", right: "4rem", bottom: "5.5rem" }}
        />
      )}
    </>
  );
}
