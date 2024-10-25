import React, { useState } from "react";
import "./design/Update.css";

export const InsertUpdate = ({ addMatch, matchData, deleteMatch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addMatch(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="insert-update-container">
      <h2>Insert Match Details</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter match details..."
        className="match-input"
      />
      <button onClick={handleAddClick} className="add-button">
        Add Match
      </button>
      <div className="match-list">
        {matchData.map((info, index) => (
          <div key={index} className="match-item">
            <p>{info}</p>
            <button
              onClick={() => deleteMatch(index)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
