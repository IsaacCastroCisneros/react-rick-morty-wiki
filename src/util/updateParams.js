export default function updateParamsUtil(setParams,setPage,params)
{
    if(Object.keys(params).length===0)
    {
      setParams({})
      setPage(0)
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