import React,{useContext,useRef,useState} from 'react'
import { CharacterContext } from '../pages/Characters';
import FilterButton from './FilterButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function FilterBox({label,children}) 
{
  const context = useContext(CharacterContext)
  const container = useRef();

  const[bool,setBool]=useState(false)

  function show(bool)
  {
    if(bool)
    {
      return {
        height:container.current.offsetHeight, 
        rotate:'180deg'
      } 
    }
    return {height:0, rotate:'0deg'}
  }

  return (
    <section className="border-[1px] border-gray-500">
      <button className='p-[1rem] block w-[100%] font-bold text-[1.2rem] border-b-[1px] border-gray-500'
       onClick={()=> setBool(prev=>!prev)}
      >
        <p className='flex w-[100%] justify-between items-center'>
          <span>{label}</span>
          {<FontAwesomeIcon 
            className='transition-all duration-[250]'
            style={{transform:`rotate(${show(bool).rotate})`}}
            icon={faChevronDown}/>}
        </p>
      </button>
      <div className="box-content overflow-hidden transition-all ease-in-out duration-200"
       style={{height:show(bool).height+'px'}}
       >
        <div className='flex flex-wrap justify-evenly gap-[1rem] items-center p-[1.3rem]' ref={container}>
          {children}
        </div>
      </div>
    </section>
  );
}
