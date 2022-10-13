import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import FilterBox from '../components/FilterBox';
import SearchBar from '../components/SearchBar'
import Paginate from '../components/Paginate';
import useFetch from '../custom-hooks/useFetch';
import FilterButton from '../components/FilterButton';
import CurrentFilters from '../components/CurrentFilters';
import updateParamsUtil from '../util/updateParams';
import Spinner from '../components/Spinner';
import joiningUrl from '../util/joiningUrl.js';
import filters from '../util/json/filtersJson.json';

export default function Locations() 
{
  const[params,setParams]=useState({})
  const[page,setPage]=useState(0)
  const url= joiningUrl('https://rickandmortyapi.com/api/location/?',params)

  useEffect(()=>
  {
     window.scrollTo(0,0)
  },[params])

  const{data:locations,isFetching,notFound}=useFetch(url)

  function updateParams(params)
  {
    updateParamsUtil(setParams,setPage,params)
  }

  return (
    <main className="px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
      <article className="w-[80rem] max-w-[100%] mx-auto block">
        <div className="flex items-start w-[100%] justify-between mb-[2rem] gap-[2rem]">
          <FiltersLocation updateParams={updateParams}/>
          <SearchBar
            updateParams={updateParams}
            placeholder="Search Location"
            css={{ flex: 1 }}
          />
        </div>
        <CurrentFilters
          params={params}
          setParams={setParams}
          updateParams={updateParams}
        />
        <h1 className="text-hover text-[4rem] font-bold mt-[2rem]">
          Locations:
        </h1>
        <article className="bg-secondary rounded-[.5rem] pt-[3.5rem] p-[3rem] border border-border">
          <section className="flex flex-col gap-[1rem]">
            {isFetching && (
              <Spinner
                css={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              />
            )}
            {notFound && (
              <strong className="block text-center text-red-500">
                no results
              </strong>
            )}
            {!isFetching&&locations?.results.map((ep) => {
              return <Location key={ep.id} {...ep} />;
            })}
          </section>
          <div className='flex w-[100%] justify-center'>
            <Paginate
              pageRange={locations?.info?.pages}
              page={page}
              setPage={setPage}
              updateParams={updateParams}
            />
          </div>
        </article>
      </article>
    </main>
  );
}

function Location(props)
{
  const
  {
    id,
    name,
    type,
    dimension,
  }=props

  return (
    <Link to={`/wiki/locations/${id}`} className="flex gradient-pink link p-[.5rem] px-[1rem] rounded-[.5rem]">
      <p>
        <span>{name}</span> | <span>{type}</span> | <span>{dimension}</span> 
      </p>
    </Link>
  );
}

function FiltersLocation({updateParams}) 
{
  return (
    <div className='flex flex-col flex-1'>
      <div>
        <FilterBox label={"Type"}>
          {filters.types[0].types.map((type, pos) => {
            return (
              <FilterButton
                key={pos}
                filter={{
                  type: "type=" + type
                }}
                label={type}
                updateParams={updateParams}
              />
            );
          })}
        </FilterBox>
      </div>
      <div>
        <FilterBox label={"Dimensions"}>
          {filters.dimensions[0].dimensions.map((dimension, pos) => {
            return (
              <FilterButton
                key={pos}
                filter={{
                  dimension: "dimension=" + dimension
                }}
                label={dimension}
                updateParams={updateParams}
              />
            );
          })}
        </FilterBox>
      </div>
    </div>
  );
}
