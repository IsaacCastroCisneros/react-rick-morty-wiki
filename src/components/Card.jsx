import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Spinner from './Spinner'
import loadImg from '/img/19.jpeg'

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
    <div
      className="block relative p-[1.5rem] rounded-[.5rem] bg-secondary border border-border transition-all duration-200"
      style={brightness(isFetching)}
    >
      <span
        className={`py-[.3rem] px-[.8rem] rounded-[.5rem] text-white absolute top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] ${statusValidation(
          status
        )}`}
      >
        {status}
      </span>
      <Link
        to={`/wiki/characters/${id}`}
        className="grid grid-cols-[1fr] relative"
      >
        {spinner && (
          <div className="relative row-start-1 col-start-1">
            <img
              src={loadImg}
              className="relative top-0 z-[5] brightness-[45%]"
              alt=""
            />
            <Spinner
              css={{
                display: "flex",
                position: "absolute",
                top:'50%',
                transform:'translateY(-50%)',
                width: "100%",
                justifyContent: "center",
                zIndex: "15",
              }}
              height={100}
              width={10}
            />
          </div>
        )}
        <LazyLoadImage
          src={image}
          className="w-[100%] z-[10] top-0 row-start-1 col-start-1"
          beforeLoad={() => setSpinner(true)}
          afterLoad={() => setSpinner(false)}
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
