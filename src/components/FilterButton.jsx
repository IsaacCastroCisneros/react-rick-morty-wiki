import React,{useContext} from 'react'
import { CharacterContext } from '../pages/Characters';

export default function FilterButton({filter,label,updateParams}) 
{

  return (
    <FilterButtonElement filter={filter} updateParams={updateParams} label={label}  />
  );
}


function FilterButtonElement({filter, updateParams, label}) {
  return (
    <button
      className="py-[.3rem] px-[.8rem] border-[1px] hover:border-link hover:bg-slate-700 border-gray-500 transition-all duration-200 rounded-[.3rem]"
      onClick={() => updateParams(filter)}
    >
      {label}
    </button>
  );
}
  