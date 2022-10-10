import React,{useContext} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({updateParams}) 
{

  function search(e)
  {
    e.preventDefault()
    updateParams({search:e.target.querySelector('input').value})
  }

  return (
    <form
      className="bg-secondary border-border border-[1px] text-text outline-none px-[.3rem] py-[.4rem] rounded-[.5rem] flex"
      onSubmit={search}
    >
      <button type='submit'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="mr-[.5rem] hover:text-link transition-all duration-200 text-white"
        />
      </button>
      <input
        placeholder="Search Character"
        className="bg-transparent outline-none flex-1"
        type="text"
      />
    </form>
  );
}
