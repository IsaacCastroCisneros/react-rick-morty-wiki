import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import Paginate from '../components/Paginate'
import Spinner from '../components/Spinner'


export default function Characters() 
{
  const[params,setParams] = useState({})
  const[page,setPage]=useState(0)

  const url = joinUrl()

  function joinUrl()
  {
    let newParams = Object.values(params)?.join('&')
    return 'https://rickandmortyapi.com/api/character/?'+newParams
  }

  function updateParams(params)
  {

    if(Object.keys(params).length===0)
    {
      setParams({})
      return
    }

    if(params.page!==undefined)
    {
      params.page='page='+params
      setParams(prev=>{return{...prev,...params}})
      return 
    }

    params.page=0
    setPage(0)

    if(params.character!==undefined)
    {
      params.character='name='+params.character
    }
    if(params.status!==undefined)
    {
      params.status='status='+params.status
    }
    if(params.species!==undefined)
    {
      params.species='species='+params.page
    }
    if(params.gender!==undefined)
    {
      params.gender='gender='+params.page
    }
    
    setParams(prev=>{return{...prev,...params}})
  }

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
          page ={page}
          setPage={setPage}
          updateParams={updateParams}
          />
        {
          isFetching && <Spinner isLoading={true}/>
        }
        <button
         onClick={()=>updateParams({status:'dead'})}
        >status</button>
        <button
         onClick={()=>updateParams({})}
         >
          reset
        </button>
    </>
  );
}


