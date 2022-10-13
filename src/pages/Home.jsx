import React from 'react'
import { Link } from 'react-router-dom'
import homeLogo from '/img/Rick-and-Morty.png'

export default function Home() 
{
  return (
    <>
      <img src={homeLogo} className='home-logo appears w-[80%] my-0 mx-auto relative top-[-5rem] transition-all ease-in-out duration-200' alt="" />

      <nav className='w-[100%] flex justify-center bottom-[5rem] absolute'>
         <ul className='home-list flex text-[2rem] gap-[7rem] text-link'>
           <li>
              <Link className='hover:text-hover hover:underline' to='wiki/characters'>Characters</Link>
           </li>
           <li>
              <Link className='hover:text-hover hover:underline' to='wiki/episodes'>Episodes</Link>
           </li>
           <li>
              <Link className='hover:text-hover hover:underline' to='wiki/locations'>Locations</Link>
           </li>
         </ul>
      </nav>
    </>
  )
}
