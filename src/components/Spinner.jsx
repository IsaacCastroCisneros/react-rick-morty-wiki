import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

 const styles = {
    display: "block",
    margin: "0 auto",
    borderColor: "grey",
    transform:"scale(200%)"
  };

export default function Spinner() 
{
    return (
        <div className="fixed right-[4rem] bottom-[5.5rem]">
          <ScaleLoader
            color={"#59df7f"}
            loading={true}
            cssOverride={styles}
          />
        </div>
    );
}
