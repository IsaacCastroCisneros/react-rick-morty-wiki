import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import ByPagination from '../components/ByPagination'
import ByInfinite from '../components/ByInfinite'
import SearchOptions from '../components/SearchOptions'

export const CharacterContext=React.createContext()

export default function Characters() 
{
  const[params,setParams] = useState({})
  const[page,setPage]=useState(0)
  const[typeQuery,setTypeQuery]=useState('infinite')

  const contextValues=
  {
    updateParams,
    changeQuery,
    params,
    setParams
  }

  useEffect(()=>
  {
     window.scrollTo(0,0)
  },[params])

  const url = joinUrl()

  function joinUrl()
  {
    let newParams = Object.values(params)?.join('&')
    return 'https://rickandmortyapi.com/api/character/?'+newParams
  }

  function updateParams(params)
  {
    if(Object.keys(params).length===0)
    {
      setParams({})
      return
    }

    if(params.page!==undefined)
    {
      params.page='page='+params.page
      setParams(prev=>{return{...prev,...params}})
      return 
    }

    params.page=0
    setPage(0)

    if(params.search!==undefined)
    {
      params.search='name='+params.search
    }
    if(params.status!==undefined)
    {
      params.status='status='+params.status
    }
    if(params.species!==undefined)
    {
      params.species='species='+params.species
    }
    if(params.gender!==undefined)
    {
      params.gender='gender='+params.gender
    }
    
    setParams(prev=>{return{...prev,...params}})
  }
 
  function changeQuery(e)
  {
    const value = e.target.value
    updateParams({page:1})
    setPage(0)
    setTypeQuery(value)
  }

  return (
    <>
      <CharacterContext.Provider value={contextValues}>
        <main className="px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
          <div className="flex gap-[3rem]">
            <div className="flex-[1.5]">
              <SearchOptions/>
            </div>
            <div className="flex-[3]">
              <div className="relative">
                {typeQuery === "pagination" && 
                  <ByPagination
                    url={url}
                    page={page}
                    setPage={setPage}
                    updateParams={updateParams}
                  />
                }
                {typeQuery === "infinite" && <ByInfinite url={url} />}
              </div>
            </div>
          </div>
        </main>
      </CharacterContext.Provider>
    </>
  );
}


