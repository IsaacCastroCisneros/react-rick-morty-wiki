import React from 'react'
import CurrentFilters from './CurrentFilters';
import Filters from './Filters';
import ListingSelector from './ListingSelector';
import SearchBar from './SearchBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

export default function SearchOptions(props) 
{ 
  const
  {
   updateParams,
   params,
   setParams,
   cross=false,
   setMobOptions,
   styles={}
  }=props

  return (
    <div className={"sticky top-[5.5rem] flex flex-col pr-[1rem] max-h-[44rem] overflow-y-auto gap-[1.2rem]"}
     style={styles}
    >
      <button
       onClick={()=>setMobOptions(false)}
       >
        {cross&& <FontAwesomeIcon icon={faXmark} className="absolute right-[2rem] top-[4.5rem] link text-[1.2rem]" />}
      </button>
      <SearchBar updateParams={updateParams} placeholder='Search Characters' />
      <ListingSelector updateParams={updateParams}/>
      <Filters updateParams={updateParams}/>
      <CurrentFilters updateParams={updateParams} params={params} setParams={setParams}/>
    </div>
  );
}
