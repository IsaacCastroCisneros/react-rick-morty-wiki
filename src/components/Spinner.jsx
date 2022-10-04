import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function Spinner({css}) 
{
   
  const cssStyles = {
    display: "block",
  };
 

  return (
        <ScaleLoader
          color={"#59df7f"}
          loading={true}
          height={200}
          width={13}
          cssOverride={{...cssStyles,...css}}
        />
  );
}
