import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import Paginate from './Paginate'
import Spinner from './Spinner'

import Card from './Card'

export default function ByPagination(props) 
{
  const[notFound,setNotFound]=useState(false)

  const{
    url,
    page,
    setPage,
    updateParams
  }=props

  const{data:characters,isFetching}=useQuery(['characters',url],getCharacters,
  {
    keepPreviousData:true,  
    onSuccess:(data)=>
    {
        console.log(data)
        console.log('successfully fetched')
    },
    onError:(err)=>
    {
        console.log(err)
        console.log('fetch failed')
    }
  })

  async function getCharacters({queryKey})
  {
    try
    {
      const res = await axios.get(queryKey[1])
      setNotFound(false)
      return res.data
    }
    catch(err)
    {
      console.log(err.message)
      setNotFound(true)

      if(err.response)
      {
        console.log(err.response.data)
        console.log('STATUS: '+err.response.status)
      }
      else if(err.request)
      {
        console.log(err.request)
      }
    }
  }

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
