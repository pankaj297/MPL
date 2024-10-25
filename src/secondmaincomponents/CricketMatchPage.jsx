import React, { useState } from "react";
import { UploadImage } from "../components/UploadImage";
import { MatchImage } from "../components/MatchImage";


export const CricketMatchPage = () => {
  const [matchImages, setMatchImages] = useState([]);


  return (
    <div className="cricket-match-page">
  
        <div className="uploadImg-container">
          <UploadImage setMatchImages={setMatchImages} />
        </div>
        <div className="matchimg-container">
          <MatchImage images={matchImages} />
        </div>
      </div>
   
  );
};

