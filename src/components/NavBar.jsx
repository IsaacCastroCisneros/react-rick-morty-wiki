import React,{useEffect} from 'react'
import { NavLink ,Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'

export default function NavBar() 
{
  const mob = useMediaQuery({query:'(max-width:826px)'})

  return (
    <header className="bg-gradient-to-t from-gradientTop to-gradientBottom py-[.5rem] px-[1.8rem] fixed top-0 w-[100%] z-[100] shadow-[.3rem_0_1rem__#000]">
      <div className="w-[100rem] max-w-[100%] my-0 mx-auto flex justify-between items-center">
        <Link className="text-white" to="/">
          Rick and Morty | wiki
        </Link>
        {!mob&&<NavBarNav/>} 
        { 
          mob&&
          <button className="link mobButton text-[1.5rem]"
           >
            <FontAwesomeIcon icon={faBurger} />
          </button>
        }
        {
          mob&&<NavBarMob/>
        }
      </div>
    </header>
  );
}

function NavBarMob()
{
   return (
     <nav className="navMob absolute p-[1.5rem] bg-blockBg top-[50%] opacity-0 pointer-events-none right-[.5rem] border-border border-[1px] transition-all duration-200 ease-in-out">
       <ul className='flex flex-col gap-[1rem] text-center'>
         <li>
           <NavLink to="/wiki/characters" className="link-mob link font-bold">
             Characters
           </NavLink>
         </li>
         <li>
           <NavLink to="/wiki/episodes" className="link-mob link font-bold">
             Episodes
           </NavLink>
         </li>
         <li>
           <NavLink to="/wiki/locations" className="link-mob link font-bold">
             Locations
           </NavLink>
         </li>
       </ul>
     </nav>
   );
}

function NavBarNav() 
{
  return (
    <nav>
      <ul className="flex gap-[2rem] items-center">
        <li>
          <NavLink to="/wiki/characters" className="link font-bold">
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink to="/wiki/episodes" className="link font-bold">
            Episodes
          </NavLink>
        </li>
        <li>
          <NavLink to="/wiki/locations" className="link font-bold">
            Locations
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
  