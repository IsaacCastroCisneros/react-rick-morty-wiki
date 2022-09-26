import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import Paginate from '../components/Paginate'


export default function Characters() 
{
  const [params,setParams] = useState({})

  const url = joinUrl()

  function joinUrl()
  {
    let newParams = Object.values(params)?.join('&')
    return 'https://rickandmortyapi.com/api/character/?'+newParams
  }

  function updateParams(params)
  {
    if(params.character!==undefined)
    {
      params.page=''
    }
    setParams(prev=>{return{...prev,...params}})
  }

  const{data:characters,status}=useQuery(['characters',url],getCharacters,
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
      return res.data
    }
    catch(err)
    {
      console.log(err.message)

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
      <SearchBar updateParams={updateParams}/>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]'>
        {characters?.results.map((char, pos) => {
          return (
            <div className='block' key={pos}>
              <img className='block w-[100%]' 
                   src={char.image} 
                />   
            </div>
          )
        })}
      </div>
      <Paginate
        pageRange={characters?.info.pages}
        params ={params.page}
        updateParams={updateParams}
       />
    </>
  );
}


