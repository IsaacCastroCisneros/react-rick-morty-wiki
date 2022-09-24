import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function SearchBar({setYo}) 
{
  
  const navigate = useNavigate()

  function search(e)
  {
    e.preventDefault()
    navigate(`/characters/search?name=${e.target.querySelector('input').value}`)
    setYo(prev=>!prev)
  }

  return (
    <div>
      <label htmlFor="characters">Characters</label>
      <form onSubmit={search}>
        <input type="text"/>
      </form>
    </div>
  );
}
