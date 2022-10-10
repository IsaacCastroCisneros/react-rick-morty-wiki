import React, { useState,useContext } from 'react'
import CurrentFilters from './CurrentFilters';
import Filters from './Filters';
import ListingSelector from './ListingSelector';
import SearchBar from './SearchBar';

export default function SearchOptions({updateParams,params,setParams}) 
{ 

  return (
    <div className="sticky top-[5.5rem] flex flex-col pr-[1rem] max-h-[44rem] overflow-y-auto gap-[1.2rem]">
      <SearchBar updateParams={updateParams}/>
      <ListingSelector updateParams={updateParams}/>
      <Filters updateParams={updateParams}/>
      <CurrentFilters updateParams={updateParams} params={params} setParams={setParams}/>
    </div>
  );
}
