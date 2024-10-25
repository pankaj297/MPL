import React from "react";
import "./design/Update.css";

export const ShowUpdate = ({ matchData }) => {
  return (
    <div className="show-update-container">
      <h2>Today's Match Update</h2>
      {matchData.length > 0 ? (
        matchData.map((info, index) => (
          <div key={index} className="match-details">
            <p>{info}</p>
          </div>
        ))
      ) : (
        <p>No match data available. Please insert match details.</p>
      )}
    </div>
  );
};
