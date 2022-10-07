import React, { useState,useContext } from 'react'
import CurrentFilters from './CurrentFilters';
import Filters from './Filters';
import ListingSelector from './ListingSelector';
import SearchBar from './SearchBar';
import { CharacterContext } from '../pages/Characters';

export default function SearchOptions() 
{ 

  const{updateParams}= useContext(CharacterContext) 

  return (
    <div className="sticky top-[5.5rem] flex flex-col pr-[1rem] max-h-[44rem] overflow-y-auto gap-[1.2rem]">
      <SearchBar/>
      <ListingSelector/>
      <Filters/>
      <CurrentFilters/>
      <button className='text-[1.2rem] link capitalize' onClick={() => updateParams({})}>reset filters</button>
    </div>
  );
}
