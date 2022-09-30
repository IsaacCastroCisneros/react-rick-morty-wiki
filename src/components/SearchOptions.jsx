import React, { useState } from 'react'
import CurrentFilters from './CurrentFilters';
import Filters from './Filters';
import ListingSelector from './ListingSelector';

export default function SearchOptions() 
{ 
  return (
    <div className="sticky top-[5.5rem] pr-[1rem] max-h-[44rem] overflow-y-auto">
      <Filters/>
      <ListingSelector/>
      <CurrentFilters/>
    </div>
  );
}
