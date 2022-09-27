import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

 const yo = {
    display: "block",
    margin: "0 auto",
    borderColor: "grey",
  };

export default function Spinner({isLoading}) 
{
    return (
        <ScaleLoader color={'#000'} loading={isLoading} cssOverride={yo} size={150} />
    );
}
