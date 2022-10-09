import React,{useEffect,useRef} from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import useShowList from '../custom-hooks/useShowList';


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
    height={400}
    width={22}
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
  const locationArr = character.location.url.split('/')
  const url = 'https://rickandmortyapi.com/api/location/'+locationArr[locationArr.length-1]

  const{data:location,isFetching}=useQuery(['location',url],getLocation)

  async function getLocation({queryKey})
  {
    const res = await axios.get(queryKey[1])
    return res.data
  }


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
  const episodesNum= character.episode.map(ep=>
    {
      const arr = ep.split('/')
      return Number(arr[arr.length-1]) 
    })

  const url = 'https://rickandmortyapi.com/api/episode/'+episodesNum.join(',')

  const{data:episodes,isFetching}=useQuery(['episodes',url],getEpisodes)

  async function getEpisodes({queryKey})
  {
    const res = await axios.get(queryKey[1])
    return res.data
  }

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

  const url = 'https://rickandmortyapi.com/api/location/'+originNum

  const{data:origin,isFetching}=useQuery(['origin',url],getOrigin)

  async function getOrigin({queryKey})
  {
    const res = await axios.get(queryKey[1])
    return res.data
  }
  console.log(origin)

  return(
     <Block
      isFetching={isFetching}
      data={origin}
      character={character}
      type="or"
      />
  )
}

function BlockElement({el,pos,type}) 
{
  return (
    <li key={el.id} className="flex py-[.3rem] gap-[.5rem] border-b-[1px] border-border">
      {
        el.name!=='unknown'&&
        <a href="" className="link ml-[1.5rem]">
         {type==='ep'&&<span>ep#{el.id} | {el.name}</span>}
         {(type==='lo'||type==='or')&&<span>{el.name}</span>}
        </a>
      }
      {
        el.name==='unknown'&&<span>{el.name}</span>
      }
      { type==='ep'&&
        pos === 0 && <span> first appereance!</span>}
    </li>
  );
}

function Block(props)
{
  const list = useRef();
  const{showList,showSwitch}=useShowList(list)

  const
  {
    isFetching,
    data,
    character,
    type,
    isOnlyOne=data&&!Array.isArray(data)
  }=props

  return (
    <section className='border-[1px] bg-secondary border-border py-[2rem] px-[1.5rem]'>
      <button
        className="flex w-[100%] justify-between items-center"
        onClick={showSwitch}
        style={isOnlyOne?{pointerEvents:'none'}:{}}
      >
        <strong className="text-hover text-[2rem] block">
          {type==="ep"&&<span className='text-white'>Episodes where {<span className='text-hover'> "{character.name}" </span> } appears:</span>} 
          {type==="lo"&&<span className='text-white'>{<span className='text-hover'> "{character.name}" </span> } Current Location :</span>} 
          {type==="or"&&<span className='text-white'>{<span className='text-hover'> "{character.name}" </span> } Origin Location :</span>} 
        </strong>
        {
          !isOnlyOne&&
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-hover text-[2rem] transition-all duration-200"
            style={{ transform: `rotate(${showList.rotate})`}}
          />
        }
      </button>
      <div
        style={!isOnlyOne?{ height: showList.height + "px" }:{}}
        className="overflow-hidden transition-all duration-[250ms] ease-in-out"
      >
        <ul ref={list}>
          {isFetching && (
            <Spinner
              css={{
                position: "relative",
                margin: "3rem auto 0 auto",
              }}
            />
          )}
          {!isOnlyOne &&
            data?.map((ep, pos) => {
              return <BlockElement pos={pos} el={ep} key={ep.id} type={type}/>;
            })}
          {isOnlyOne && <BlockElement pos={0} el={data} type={type}/>}
        </ul>
      </div>
    </section>
  );
}
  
  