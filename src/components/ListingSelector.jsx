import React,{useContext} from 'react'
import { CharacterContext } from '../pages/Characters'

export default function ListingSelector() 
{
  const{changeQuery}=useContext(CharacterContext)
  
  return (
    <div className='flex flex-col'>
      <label htmlFor="list result by" className='capitalize text-[1.2rem] font-bold text-hover'>list results by:</label>
      <select name="" id="" className='text-black py-[.4rem] px-[.2rem] cursor-pointer'
       onChange={changeQuery}
       >
        <option value="infinite">Infinite</option>
        <option value="pagination">Pagination</option>
      </select>
    </div>
  );
}
