import React,{useContext} from 'react'
import FilterBox from './FilterBox';
import FilterButton from './FilterButton';

export default function Filters() 
{
  return (
    <>
      <div>
        <FilterBox label={"Status"}>
          <FilterButton filter={{ status: "Alive" }} label={"Alive"} />
          <FilterButton filter={{ status: "Dead" }} label={"Dead"} />
          <FilterButton filter={{ status: "Unknown" }} label={"Unknown"} />
        </FilterBox>
        <FilterBox label={"Species"}>
          <FilterButton filter={{ species: "Human" }} label={"Human"} />
          <FilterButton filter={{ species: "Humanoid" }} label={"Humanoid"} />
          <FilterButton filter={{ species: "Alien" }} label={"Alien"} />
          <FilterButton filter={{ species: "Poopybutthole" }} label={"Poopybutthole"} />
          <FilterButton filter={{ species: "Mythological" }} label={"Mythological"} />
          <FilterButton filter={{ species: "Unknown" }} label={"Unknown"} />
          <FilterButton filter={{ species: "Animal" }} label={"Animal"} />
          <FilterButton filter={{ species: "Robot" }} label={"Robot"} />
          <FilterButton filter={{ species: "Cronenberg" }} label={"Cronenberg"} />
        </FilterBox>
        <FilterBox label={"Gender"}>
          <FilterButton filter={{ gender: "Male" }} label={"Male"} />
          <FilterButton filter={{ gender: "Female" }} label={"Female"} />
          <FilterButton filter={{ gender: "Genderless" }} label={"Genderless"} />
        </FilterBox>
      </div>
    </>
  );
}
