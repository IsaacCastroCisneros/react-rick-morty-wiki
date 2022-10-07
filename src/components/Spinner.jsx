import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function Spinner(props) 
{
  const
  {
    css,
    height=200,
    width=13,
  } = props

  const cssStyles = {
    display: "block",
    width:'fit-content'
  };
 

  return (
        <ScaleLoader
          color={"#59df7f"}
          loading={true}
          height={height}
          width={width}
          cssOverride={{...cssStyles,...css}}
        />
  );
}
