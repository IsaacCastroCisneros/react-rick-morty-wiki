import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function SearchBar({updateParams}) 
{

  function search(e)
  {
    e.preventDefault()
    updateParams({character:e.target.querySelector('input').value})
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
