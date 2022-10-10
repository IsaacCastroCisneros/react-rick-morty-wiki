import React,{useState,useContext} from 'react'
import { CharacterContext } from '../pages/Characters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CurrentFilters({params,setParams,updateParams}) 
{
  const newParams = {...params}
  delete newParams.page

  const paramValues = Object.values(newParams)
  const values = paramValues.map(param=> param.split('=').pop())
  const paramKeys = Object.keys(newParams)
  const filters = values.map((param,pos)=>{return {prop:paramKeys[pos],value:param}})

  return (
    <div className='border-[1px] flex-1 border-gray-500 p-[1rem]'>
      <h1 className="text-hover text-[2rem] font-bold mb-[1rem]">Current Filters:</h1>
      <ul className="flex flex-col gap-[.6rem]">
        {filters.map((filter,pos) => {
          return (
            <CurrentFilter
              key={pos}
              value={filter.value}
              prop={filter.prop}
              params={params}
              setParams={setParams}
            />
          );
        })}
      </ul>
      <button className='text-[1.2rem] link capitalize block text-center w-[100%] mt-[2rem]' onClick={() => updateParams({})}>reset filters</button>
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
    delete newParams[prop]
    setParams(newParams)
  }

  return (
    <li className='gradient flex items-center py-[.4rem] px-[1rem] rounded-[.5rem]'>
      <span className='capitalize font-bold text-white'>{prop!=='episode'?prop:'season'}|</span>
      <span className='text-white' 
       >{value}</span>
      <button className='ml-[auto] text-white'
       onClick={() => removeFilter(prop)}>
        <FontAwesomeIcon icon={faXmark} className='hover:text-hover' />
       </button>
    </li>
  );
}
  
