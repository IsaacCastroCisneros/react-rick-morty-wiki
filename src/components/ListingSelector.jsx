import React,{useContext} from 'react'
import { CharacterContext } from '../pages/Characters'

export default function ListingSelector() 
{
  const{changeQuery}=useContext(CharacterContext)
  
  return (
    <select name="" id="" onChange={changeQuery}>
      <option value="pagination">pagination</option>
      <option value="infinite">infinite</option>
    </select>
  );
}
