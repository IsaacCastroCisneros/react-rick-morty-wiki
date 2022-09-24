import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function SearchBar({searchCharacter}) 
{
  
  const navigate = useNavigate()

  function search(e)
  {
    e.preventDefault()
    navigate(`/characters/search?name=${e.target.querySelector('input').value}`)
    searchCharacter()
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
