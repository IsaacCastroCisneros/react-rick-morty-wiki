import React,{useContext} from 'react'
import { CharacterContext } from '../pages/Characters'
import {useNavigate} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() 
{
  const{updateParams}=useContext(CharacterContext)

  const navigate= useNavigate();

  function search(e)
  {
    e.preventDefault()
    navigate('/characters')
    updateParams({search:e.target.querySelector('input').value})
  }

  return (
    <form
      className="bg-background block w-fit outline-none px-[.3rem] py-[.4rem] rounded-[.5rem] text-white"
      onSubmit={search}
    >
      <button type='submit'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="mr-[.5rem] hover:text-link transition-all duration-200"
        />
      </button>
      <input
        placeholder="Search Character"
        className="bg-transparent outline-none"
        type="text"
      />
    </form>
  );
}
