import React,{useState} from 'react'

export default function useShowList(el) 
{
  const[bool,setBool]=useState(false)
  
  let showList={height:0, rotate:'0deg'}

  function showSwitch()
  {
    setBool(prev=>!prev)
  }

  if(bool)
  {
    showList ={
      height: el.current.offsetHeight,
      rotate: "180deg",
    }
  }

  return{
    showSwitch,
    showList
  }
}
