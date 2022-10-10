import React,{useState,useEffect} from 'react'
import FilterBox from '../components/FilterBox';
import SearchBar from '../components/SearchBar'
import Paginate from '../components/Paginate';
import useFetch from '../custom-hooks/useFetch';
import FilterButton from '../components/FilterButton';
import CurrentFilters from '../components/CurrentFilters';
import updateParamsUtil from '../util/updateParams';

export default function Episodes() 
{
  const[params,setParams]=useState({})
  const[page,setPage]=useState(0)
  const url= joinUrl()

  function joinUrl()
  {
    let newParams = Object.values(params)?.join('&')
    return 'https://rickandmortyapi.com/api/episode/?'+newParams
  }

  useEffect(()=>
  {
     window.scrollTo(0,0)
  },[params])

  const{data:episodes,isFetching}=useFetch(url)

  function updateParams(params)
  {
    updateParamsUtil(setParams,setPage,params)
  }

  return (
    <main className="px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
      <div className="w-[80rem] max-w-[100%] mx-auto">
        <article className="flex">
          <h1 className="text-hover text-[4rem] font-bold">Episodes:</h1>
          <SearchBar updateParams={updateParams} />
          <div>
            <FilterBox label={"Season"}>
              <FilterButton
                filter={{ episode: "S01" }}
                label={"S01"}
                updateParams={updateParams}
              />
              <FilterButton
                filter={{ episode: "S02" }}
                label={"S02"}
                updateParams={updateParams}
              />
              <FilterButton
                filter={{ episode: "S03" }}
                label={"S03"}
                updateParams={updateParams}
              />
              <FilterButton
                filter={{ episode: "S04" }}
                label={"S04"}
                updateParams={updateParams}
              />
            </FilterBox>
          </div>
           <CurrentFilters 
             params={params} 
             setParams={setParams}
             updateParams={updateParams}
            />
        </article>
        <article className="bg-secondary rounded-[.5rem] pt-[3.5rem] p-[3rem] border border-border">
          <section className="flex flex-col gap-[1rem]">
            {episodes?.results.map((ep) => {
              return <Episode key={ep.id} {...ep} />;
            })}
          </section>
          <Paginate
            pageRange={episodes?.info?.pages}
            page={page}
            setPage={setPage}
            updateParams={updateParams}
          />
        </article>
      </div>
    </main>
  );
}

function Episode(props)
{
  const
  {
    name,
    air_date,
    episode,
    url,
  }=props


  return (
    <a href="" className="flex gradient-pink link p-[.5rem] px-[1rem] rounded-[.5rem]">
      <p>
        <span>#{url.split('/').pop()}</span> | <span>{name}</span> | <span>{episode}</span> | <span>{air_date}</span> 
      </p>
    </a>
  );
}
