import React,{useRef,useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loadImg from '/img/19.jpeg'
import Spinner from './Spinner'

export default function Card(props) 
{
  const[spinner,setSpinner]=useState(false)

  const{
    id,
    image,
    status,
    name,
    species,
    gender,
    isFetching
  }=props

  function statusValidation(status)
  {
    switch(status)
    {
      case 'Dead': 
      {
        return 'bg-red-500'
      }
      case 'Alive': 
      {
        return 'bg-hover'
      }
      case 'unknown':
      {
        return 'bg-gray-500'
      }
    }
  }

  function brightness(bool)
  {
    if(bool)
    {
      return {filter:'brightness(45%)'}
    }
    return {}
  }

  return (
    <div className="block relative p-[1.5rem] rounded-[.5rem] bg-secondary border border-border transition-all duration-200"
    style={brightness(isFetching)}
    >
      <span
        className={`py-[.3rem] px-[.8rem] rounded-[.5rem] text-white absolute top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] ${statusValidation(
          status
        )}`}
      >
        {status}
      </span>
      <Link to={`/wiki/characters/${id}`} className='block relative w-[267.64px] h-[267.64px]'>
        {
          spinner&&
          <Spinner
          css={
            {
              position:'absolute',
              top:'50%',
              left:'50%',
              transform:'translate(-50%,-50%)',
              zIndex:2
            }
          }
          />
        }
        {
          spinner&&
          <img src={loadImg} alt="" className='absolute w-[100%] brightness-[45%] z-0'/>
        }
        <LazyLoadImage
          src={image}
          className='w-[100%] absolute z-5'
          beforeLoad={()=>setSpinner(true)}
          afterLoad={()=>setSpinner(false)}
         />
      </Link>
      <section className="flex flex-col mt-[1rem]">
        <h1 className="text-white text-[1.3rem] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h1>
        <span>
          <strong className="text-white">Species: </strong>
          {species}
        </span>
        <span className="mb-[1rem]">
          <strong className="text-white">Gender: </strong>
          {gender}
        </span>
        <Link
          to={`/wiki/characters/${id}`}
          className="w-[100%] text-center text-link hover:text-hover hover:underline"
        >
          Character Profile
        </Link>
      </section>
    </div>
  );
}
