import React,{useState,useContext} from 'react'
import { CharacterContext } from '../pages/Characters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CurrentFilters() 
{
  const{params,setParams}=useContext(CharacterContext)

  const paramValues = Object.values(params)
  const values = paramValues.filter(param=>typeof param==='string').map(param=> param.split('=').pop())

  const paramKeys = Object.keys(params).filter(param=>param!=='page')

  const filters = values.map((param,pos)=>{return {prop:paramKeys[pos],value:param}})

  console.log(params)

  return (
    <div className='border-[1px] border-gray-500 p-[1rem]'>
      <h1 className="text-hover text-[2rem] font-bold mb-[1rem]">Current Filters:</h1>
      <ul className="flex flex-col gap-[.6rem]">
        {filters.map((filter) => {
          if (filter.value === "") return null;
          return (
            <CurrentFilter
              value={filter.value}
              prop={filter.prop}
              params={params}
              setParams={setParams}
            />
          );
        })}
      </ul>
    </div>
  );
}

function CurrentFilter(props) 
{
  const{
   value,
   prop,
   params,
   setParams
  }=props

  function removeFilter(prop)
  {
    const newParams={...params}
    newParams[prop]=''
    setParams(newParams)
  }

  return (
    <li className='gradient flex items-center py-[.4rem] px-[1rem] rounded-[.5rem]'>
      <span className='capitalize font-bold text-white'>{prop}|</span>
      <span className='text-white' 
       >{value}</span>
      <button className='ml-[auto] text-white'
       onClick={() => removeFilter(prop)}>
        <FontAwesomeIcon icon={faXmark} className='hover:text-hover' />
       </button>
    </li>
  );
}
  
