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

export default function Locations() 
{
  const[params,setParams]=useState({})
  const[types,setTypes]=useState([])
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

  
  function lol()
  {
    const sets = locations?.results.map(res=>
      {
        return res.dimension
      })
    const hmm = [...new Set([...types,...sets])] 
    setTypes(hmm )
  }

  async function si()
  {
    await fetch('http://localhost:3000/dimensions/1',
    {
      method:'PUT',
      headers:
      {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id:1,dimensions:types})
    })
    console.log('yooo')
  }

  return (
    <main className="px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
      <article className="w-[80rem] max-w-[100%] mx-auto block">
        <div className="flex items-center w-[100%] justify-between mb-[2rem] gap-[2rem]">
          <FiltersEpisode updateParams={updateParams} />
          <SearchBar
            updateParams={updateParams}
            placeholder="Search Location"
            css={{ flex: 1 }}
          />
        </div>
        <button onClick={lol}>fdsfsfdgvfdgd</button>
        <button onClick={si}>gffgf</button>
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

function FiltersEpisode({updateParams}) 
{
  return (
    <div>
      <FilterBox label={"Type"}>
        <FilterButton
          filter={{
            episode: "episode=S01",
          }}
          label={"S01"}
          updateParams={updateParams}
        />
        <FilterButton
          filter={{
            episode: "episode=S02",
          }}
          label={"S02"}
          updateParams={updateParams}
        />
        <FilterButton
          filter={{
            episode: "episode=S03",
          }}
          label={"S03"}
          updateParams={updateParams}
        />
        <FilterButton
          filter={{
            episode: "episode=S04",
          }}
          label={"S04"}
          updateParams={updateParams}
        />
      </FilterBox>
    </div>
  );
}
