import React,{useState,useEffect} from 'react'
import ByPagination from '../components/ByPagination'
import ByInfinite from '../components/ByInfinite'
import SearchOptions from '../components/SearchOptions'
import updateParamsUtil from '../util/updateParams'
import joiningUrl from '../util/joiningUrl'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'

export const CharacterContext=React.createContext()

export default function Characters() 
{
  const[params,setParams] = useState({})
  const[page,setPage]=useState(0)
  const[typeQuery,setTypeQuery]=useState('infinite')
  const[mobOptions,setMobOptions]=useState(false)

  const mob = useMediaQuery({query:'(max-width:888px)'})

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
    setMobOptions(false)
    document.querySelector('body').style.overflow='auto'
  },[params])

  const url = joiningUrl('https://rickandmortyapi.com/api/character/?',params)

  function updateParams(params)
  {
    updateParamsUtil(setParams,setPage,params)
  }
 
  function changeQuery(e)
  {
    const value = e.target.value
    updateParams({page:1})
    setPage(0)
    setTypeQuery(value)
  }

  if(mobOptions)
  {
    document.querySelector('body').style.overflow='hidden'
  }
  else
  {
    document.querySelector('body').style.overflow='auto'
  }


  return (
    <>
      <CharacterContext.Provider value={contextValues}>
        <main className="mob:px-[1.5rem] px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
          <div className="flex gap-[3rem]">
            {!mob && (
              <div className="flex-[1.5]">
                <SearchOptions
                  updateParams={updateParams}
                  params={params}
                  setParams={setParams}
                />
              </div>
            )}
            <div className="flex-[3]">
              <div className="relative">
                {typeQuery === "pagination" && (
                  <ByPagination
                    url={url}
                    page={page}
                    setPage={setPage}
                    updateParams={updateParams}
                  />
                )}
                {typeQuery === "infinite" && <ByInfinite url={url} />}
              </div>
            </div>
          </div>
          {mob && (
            <button
              className="block w-[3.5rem] py-[.1rem] rounded-[.3rem] rounded-r-none border-border border-[1px] gradient fixed top-[50%] z-[20] text-[2rem] text-link hover:text-hover right-0"
              onClick={() => {
                setMobOptions(true)
              }}
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          )}
          {mob && mobOptions&& (
              <SearchOptions
                updateParams={updateParams}
                params={params}
                setParams={setParams}
                cross={true}
                setMobOptions={setMobOptions}
                styles={
                  {
                    position:'fixed',
                    top:'0',
                    zIndex:'20',
                    left:'0',
                    height:'100%',
                    width:'100%',
                    padding:'5rem 2rem 2rem',
                    backgroundColor:'#1e1e1e'
                  }
                }
              />
          )}
        </main>
      </CharacterContext.Provider>
    </>
  );
}



