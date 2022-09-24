import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import SearchBar from '../components/SearchBar'

export default function Characters() 
{

  const reqParam = useLocation()
  const [yo,setYo]=useState(false)
  const [params,setParams] = useState(
    {
      characters:'',
      page:'',
    }
  )
  const url = joinUrl()
  
  function joinUrl()
  {
    const newParams = Object.values(params).join('')
    return 'https://rickandmortyapi.com/api/character/'+newParams
  }
   
  useEffect(()=>
  {
    setParams(prev=>{return {...prev,characters:reqParam.search}})
  },[yo])

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
    console.log(queryKey[1])
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

  function RenderPageButtons(quantity)
  {
    let buttons = []
    for (let i = 1; i <= quantity; i++) 
    {
      buttons.push(i);
    }

    return buttons
  }

  console.log(url)

  return (
     <>
       <SearchBar setYo={setYo} />
       {
         characters?.results.map(char=>
            {
                return(
                    <img src={char.image} alt="" />
                )
            })
       }
       <ul>
         {
           characters && RenderPageButtons(characters.info.pages).map(num=>
            {
              return(
                <PageButton num={num} setParams={setParams}/>
              )
            })
         }
       </ul>
     </>
  )
}

function PageButton({num,setParams})
{
  return(
    <li>
        <button
         onClick={()=>setParams(prev=>{return {...prev,page:`&page=${num}`}})}
        >{num}</button>
    </li>
  )
}

