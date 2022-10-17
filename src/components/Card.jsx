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
      className="block relative p-[1.5rem] rounded-[.5rem] bg-secondary border border-border transition-all duration-200 mob:p-[1rem]"
      style={brightness(isFetching)}
    >
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
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                justifyContent: "center",
                zIndex: "10",
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
        <span
          className={`mob:px-[.5rem] mob:py-[.1rem] mob:text-[.6rem] mob:rounded-[.3rem] z-[15] py-[.3rem] px-[.8rem] rounded-[.5rem] text-white absolute right-[.4rem] bottom-[.4rem] shadow-[0_.2rem_.5rem_#363636] ${statusValidation(
            status
          )}`}
        >
          {status}
        </span>
      </Link>
      <section className="flex flex-col mt-[1rem]">
        <h1 className="mob:text-[.8rem] text-white text-[1.3rem] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h1>
        <span className='mob:text-[.6rem]'>
          <strong className="text-white">Species: </strong>
          {species}
        </span>
        <span className="mob:text-[.6rem] mb-[1rem]">
          <strong className="text-white">Gender: </strong>
          {gender}
        </span>
        <Link
          to={`/wiki/characters/${id}`}
          className="mob:text-[.6rem] w-[100%] text-center text-link hover:text-hover hover:underline"
        >
          Character Profile
        </Link>
      </section>
    </div>
  );
}
