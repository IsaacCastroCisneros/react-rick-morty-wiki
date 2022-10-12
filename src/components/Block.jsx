import React,{useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import useShowList from '../custom-hooks/useShowList';
import Spinner from './Spinner';
import Card from './Card';
import { Link } from 'react-router-dom';

export default function Block(props) 
{
    const list = useRef();
    const{showList,showSwitch}=useShowList(list)

    const
    {
        isFetching,
        data,
        character,
        type,
        isOnlyOne=data&&!Array.isArray(data)
    }=props

    return (
        <section className='border-[1px] bg-secondary border-border py-[2rem] px-[1.5rem]'>
        <button
            className="flex w-[100%] justify-between items-center"
            onClick={showSwitch}
            style={isOnlyOne?{pointerEvents:'none'}:{}}
        >
            <strong className="text-hover text-[2rem] block">
            {type==="ep"&&<span className='text-white'>Episodes where {<span className='text-hover'> "{character.name}" </span> } appears:</span>} 
            {type==="lo"&&<span className='text-white'>{<span className='text-hover'> "{character.name}" </span> } Current Location :</span>} 
            {type==="or"&&<span className='text-white'>{<span className='text-hover'> "{character.name}" </span> } Origin Location :</span>} 
            {type==="ch"&&<span className='text-hover'>Characters from episode :</span>} 
            </strong>
            {
            !isOnlyOne&&(type!=='ch')&&
            <FontAwesomeIcon
                icon={faChevronDown}
                className="text-hover text-[2rem] transition-all duration-200"
                style={{ transform: `rotate(${showList.rotate})`}}
            />
            }
        </button>
        <div
            style={(!isOnlyOne&&(type!=='ch'))?{ height: showList.height + "px" }:{}}
            className="overflow-hidden transition-all duration-[250ms] ease-in-out"
        >
            <ul ref={list} className={(type==='ch')&&'grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-[1rem] gap-y-[3rem] py-[3.5rem] w-[]'}>
            {isFetching && (
                <Spinner
                  css={{
                      display:'flex',
                      justifyContent:'center',
                      width:'100%'
                  }}
                />
            )}
            {!isOnlyOne &&
                data?.map((ep, pos) => {
                return <BlockElement pos={pos} el={ep} key={ep.id||pos} type={type}/>;
                })}
            {isOnlyOne && <BlockElement pos={0} el={data} type={type}/>}
            </ul>
        </div>
        </section>
    );
}

function BlockElement({el,pos,type}) 
{
  if(type==='ch')
  {
    return <Card {...el}/>
  }
  return (
    <li key={el.id} className="flex py-[.3rem] gap-[.5rem] border-b-[1px] border-border">
      {
        el.name!=='unknown'&&
        <Link to={`/wiki/episodes/${el.id}`} className="link ml-[1.5rem]">
         {type==='ep'&&<span>ep#{el.id} | {el.name}</span>}
         {(type==='lo'||type==='or')&&<span>{el.name}</span>}
        </Link>
      }
      {
        el.name==='unknown'&&<span>{el.name}</span>
      }
      { type==='ep'&&
        pos === 0 && <span> first appereance!</span>}
    </li>
  );
}
