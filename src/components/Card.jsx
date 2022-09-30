import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

export default function Card(props) 
{
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
    <div className="block relative p-[1.5rem] rounded-[.5rem] bg-card border border-gray-600 transition-all duration-200"
    style={brightness(isFetching)}
    >
      <span
        className={`py-[.3rem] px-[.8rem] rounded-[.5rem] text-white absolute top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] ${statusValidation(
          status
        )}`}
      >
        {status}
      </span>
      <Link to={`/character/${id}`} className='block'>
        <img className="block w-[100%]" src={image} />
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
          to={`/character/${id}`}
          className="w-[100%] text-center text-link hover:text-hover hover:underline"
        >
          Character Profile
        </Link>
      </section>
    </div>
  );
}
