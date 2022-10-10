import React,{useContext} from 'react'
import FilterBox from './FilterBox';
import FilterButton from './FilterButton';

export default function Filters({updateParams}) 
{
  return (
    <>
      <div>
        <FilterBox label={"Status"}>
          <FilterButton filter={{ status: "Alive" }} label={"Alive"} updateParams={updateParams} />
          <FilterButton filter={{ status: "Dead" }} label={"Dead"} updateParams={updateParams} />
          <FilterButton filter={{ status: "Unknown" }} label={"Unknown"} updateParams={updateParams} />
        </FilterBox>
        <FilterBox label={"Species"}>
          <FilterButton filter={{ species: "Human" }} label={"Human"}updateParams={updateParams}  />
          <FilterButton filter={{ species: "Humanoid" }} label={"Humanoid"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Alien" }} label={"Alien"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Poopybutthole" }} label={"Poopybutthole"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Mythological" }} label={"Mythological"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Unknown" }} label={"Unknown"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Animal" }} label={"Animal"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Robot" }} label={"Robot"} updateParams={updateParams} />
          <FilterButton filter={{ species: "Cronenberg" }} label={"Cronenberg"} updateParams={updateParams} />
        </FilterBox>
        <FilterBox label={"Gender"}>
          <FilterButton filter={{ gender: "Male" }} label={"Male"} updateParams={updateParams} />
          <FilterButton filter={{ gender: "Female" }} label={"Female"} updateParams={updateParams} />
          <FilterButton filter={{ gender: "Genderless" }} label={"Genderless"} updateParams={updateParams} />
        </FilterBox>
      </div>
    </>
  );
}
