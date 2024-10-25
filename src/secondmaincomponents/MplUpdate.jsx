import React, { useState } from "react";
import { InsertUpdate } from "../components/insertUpdate";
import { ShowUpdate } from "../components/ShowUpdate";
import "../components/design/Update.css";

export const MplUpdate = () => {
  const [matchData, setMatchData] = useState([]);

  // Function to add new match info
  const addMatch = (data) => {
    setMatchData((prevData) => [...prevData, data]);
  };

  // Function to delete a match entry
  const deleteMatch = (index) => {
    setMatchData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <div className="section insert-section">
        <InsertUpdate
          addMatch={addMatch}
          matchData={matchData}
          deleteMatch={deleteMatch}
        />
      </div>
      <div className="section show-section">
        <ShowUpdate matchData={matchData} />
      </div>
    </div>
  );
};
