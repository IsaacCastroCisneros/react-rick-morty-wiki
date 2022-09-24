import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import SearchBar from '../components/SearchBar'

export default function Characters() 
{

  const searchParam = useLocation().search
  const [url,setUrl] = useState('')
   
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

  useEffect(()=>
  {
    setUrl(`https://rickandmortyapi.com/api/character/${searchParam??''}`)
  },)

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
       <SearchBar />
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
                <PageButton num={num} setUrl={setUrl} />
              )
            })
         }
       </ul>
     </>
  )
}

function PageButton({num,setUrl})
{
  return(
    <li>
        <button
         onClick={()=>setUrl(prev=>prev+`&page=${num}`)}
        >{num}</button>
    </li>
  )
}

