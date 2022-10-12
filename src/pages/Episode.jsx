import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../custom-hooks/useFetch'
import Spinner from '../components/Spinner'
import Block from '../components/Block'

export default function Episode() 
{
  const{id}=useParams()
  const url='https://rickandmortyapi.com/api/episode/'+id
  const{data:episode,isFetching}=useFetch(url)

  function charactersUrl(charactersArr)
  {
    const characterNums=charactersArr?.map(ep=>
      {
        return ep.split('/').pop()
      })
    
    const url = 'https://rickandmortyapi.com/api/character/'+characterNums.join(',')
    
    return url
  }

  return (
    <main className="px-[1.8rem] pt-[5rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
      {isFetching&&<Spinner
        css={
          {
            display:'flex',
            justifyContent:'center',
            width:'100%',
          }
        }
        height={400}
        width={22}
       />}
      {episode && (
          <article className="block">
            <section className='block mb-[3rem]'>
              <h1 className="font-bold text-hover text-[3rem] text-center mb-[2rem]">
                {episode.name}
              </h1>
              <p className="flex gap-[1rem] w-[100%] justify-center text-white font-bold">
                <span>{episode.air_date}</span> - <span>{episode.episode}</span>
              </p>
            </section>
            <CharactersByEpisode url={charactersUrl(episode.characters)} /> 
          </article>          
      )}
    </main>
  );
}

function CharactersByEpisode({url})
{
  const{data:characters,isFetching}=useFetch(url)
   
  return (
    <>
      <Block data={characters} type="ch" isFetching={isFetching} />
    </>
  );
}

