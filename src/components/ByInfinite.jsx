import React,{useEffect,useState} from 'react'
import { useInfiniteQuery } from 'react-query'
import {useInView} from 'react-intersection-observer'
import Spinner from './Spinner'
import axios from 'axios'

import Card from './Card'

export default function ByInfinite({url}) 
{
  const[notFound,setNotFound]=useState(false)
  const{ref,inView}= useInView();
  
  const{
    data:characters,
    isFetching,
    fetchNextPage,
    hasNextPage
  }=useInfiniteQuery(['characters',url],getCharacters,
  {
    getNextPageParam:(page)=>
    {
      const next = page?.info?.next
      return next
    }
  })
  
  useEffect(()=>
  {
     if(inView&&hasNextPage)
     {
       fetchNextPage()
     }

  },[inView])

  async function getCharacters({queryKey,pageParam=undefined})
  {
    let newUrl = queryKey[1];
    if(pageParam!==undefined)
    {
      newUrl = pageParam
    }
    try
    {
      const res = await axios.get(newUrl)
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] mob:grid-cols-[repeat(2,minmax(8.5rem,1fr))] gap-[1rem]">
        {characters?.pages?.map((page) => {
          return page?.results.map((char) => {
            return <Card {...char} key={char.id} isFetching={isFetching} />;
          });
        })}
        {
          notFound&&<span>nothing here :( search another thing</span>
        }
      </div>
      {isFetching && 
        <div className='mt-[2.5rem]'>
          <Spinner
            css={{
              display: "flex",
              position:'relative',
              justifyContent:'center',
              width:'auto'
            }}
          />
        </div>
      }
      {
        hasNextPage===false&&<span className='w-[100%] text-center block mt-[2rem] text-[1.3rem]'>No more shit :)</span>
      }
      <span ref={ref} className='block h-[1rem] w-[1rem]'></span>
      
    </>
  );
}
