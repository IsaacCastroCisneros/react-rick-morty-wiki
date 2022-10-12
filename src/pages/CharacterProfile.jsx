import React,{useEffect,useRef} from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useFetch from '../custom-hooks/useFetch';
import Block from '../components/Block';


export default function CharacterProfile() 
{
  const{id} = useParams()
  const url='https://rickandmortyapi.com/api/character/'+id

  const{data:character,isFetching}=useQuery(['character',url],getCharacter)

  async function getCharacter({queryKey})
  {
    const res = await axios.get(queryKey[1]);
    return res.data 
  }

  function validatingStatus(status)
  {
    switch(status)
    {
      case 'Alive':
        return 'bg-hover'
      case 'Dead':
        return 'bg-red-500'
      case 'unknown':
        return 'bg-gray-500'
    }
  }

  useEffect(()=>
  {
    window.scrollTo(0,0);
  })

  if(isFetching)
  {
    return <Spinner 
    css={
      {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
      }
    } 
    />
  }

  return (
    <main className="px-[1.8rem] pt-[5rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={character?.image}
          className="rounded-[100%] border-[10px] border-white"
          alt=""
        />
        <strong className="text-hover text-[3rem]">{character?.name}</strong>
      </div>
      <section className="flex text-white items-center gap-[.5rem] justify-center mb-[2rem]">
        <span
          className={`w-[.6rem] h-[.6rem] rounded-[100%] block first-letter 
            ${validatingStatus(character?.status)}`}
        ></span>
        <strong>
          {character?.status} - {character?.species} - {character?.gender}
        </strong>
      </section>
      {character && (
        <article className="flex flex-col gap-[2rem]">
              <Episodes character={character}/>
              {
                character.location.name!=='unknown'&&<Location character={character}/>
              }
              {
                character.location.name==='unknown'&&
                <Block 
                 type="lo"
                 character={character}
                 data={character.location}
                 isOnlyOne={true}
                 />
              }
              <Origin character={character}/>
        </article>
      )}
    </main>
  );
}

function Location({character})
{
  const{data:location,isFetching}=useFetch('https://rickandmortyapi.com/api/location/','splitSingle',character)

  return(
    <Block
      data={location}
      isFetching={isFetching}
      character={character}
      type="lo"
     />      
  )
}

function Episodes({character}) 
{
  const{data:episodes,isFetching}=useFetch('https://rickandmortyapi.com/api/episode/','splitArr',character)

  return (
    <Block
      isFetching={isFetching}
      data={episodes}
      character={character}
      type="ep"
     />
  );
}

function Origin({character})
{
  const originArr = character.origin.url.split('/')
  const originNum = originArr[originArr.length-1] 
  if(originNum==='')
  {
    return(
      <Block
       isFetching={false}
       data={{name:'unknowm'}}
       character={character}
       type="or"
       />
   )
  }
  const{data:origin,isFetching}=useFetch('https://rickandmortyapi.com/api/location/'+originNum)

  return(
     <Block
      isFetching={isFetching}
      data={origin}
      character={character}
      type="or"
      />
  )
}




  
  