import React,{useEffect} from 'react'
import { useInfiniteQuery } from 'react-query'
import {useInView} from 'react-intersection-observer'
import Spinner from './Spinner'
import axios from 'axios'

import Card from './Card'

export default function ByInfinite({url}) 
{
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
      const next = page.info.next
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

    const res = await axios.get(newUrl)
    return res.data
  }

  return (
    <>
      <div>
        {
           characters?.pages?.map(page=>
                {
                  return page.results.map(char=>
                        {
                            return <Card image={char.image} />
                        })
                })
        }
      </div>
      {
        isFetching&&<Spinner isLoading={true}/>
      }
      <span ref={ref}>intersector</span>
    </>
  );
}
