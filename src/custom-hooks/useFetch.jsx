import React,{useState} from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function useFetch(url,type='none',elToSplitting) 
{
  const[notFound,setNotFound]=useState(false)

  function newUrl()
  {
    switch(type)
    {
      case 'splitArr':
      {
        const episodesNum= elToSplitting.episode.map(ep=>
          {
            const arr = ep.split('/')
            return Number(arr[arr.length-1]) 
          })
      
        return url+episodesNum.join(',')
      }
      case 'splitSingle':
      {
        const locationArr = elToSplitting.location.url.split('/')
        return url+locationArr[locationArr.length-1]
      }
      case 'none':
      {
        return url
      }
    }
  }
  const{data,isFetching}=useQuery(['request',newUrl()],requestFunc,
  {
    keepPreviousData:true
  })

  async function requestFunc({queryKey})
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
  
  return {
    data,
    isFetching,
    notFound
  }
}
