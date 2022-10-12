import React,{useState,useEffect} from 'react'
import ByPagination from '../components/ByPagination'
import ByInfinite from '../components/ByInfinite'
import SearchOptions from '../components/SearchOptions'
import updateParamsUtil from '../util/updateParams'
import joiningUrl from '../util/joiningUrl'

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

  return (
    <>
      <CharacterContext.Provider value={contextValues}>
        <main className="px-[1.8rem] mt-[6rem] pb-[2.5rem] w-[100rem] max-w-[100%] mx-auto">
          <div className="flex gap-[3rem]">
            <div className="flex-[1.5]">
              <SearchOptions updateParams={updateParams} params={params} setParams={setParams} />
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


