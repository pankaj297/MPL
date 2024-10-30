import React, { useState } from "react";
import "./AdminDesign/AdminLiveAuction.css";

export const AdminLiveAuction = () => {
  const [currentBid, setCurrentBid] = useState();
  const [lastBiddingTeam, setLastBiddingTeam] = useState("No Bidder");
  const [finalized, setFinalized] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Initially null

  const players = [
    {
      id: 1,
      profileImg: "./images/baban.jpeg",
      name: "Baban Ratilal Naik",
      age: 21,
      position: "All Rounder",
      finalTeam: "Chennai Super Kings",
    },
    {
      id: 2,
      profileImg: "./images/pankaj.jpeg",
      name: "Pankaj Suklal Naik",
      age: 24,
      position: "Batsman",
      finalTeam: "",
    },
    {
      id: 3,
      profileImg: "./images/ak.enc",
      name: "Akash Ramesh Naik",
      age: 22,
      position: "Wicket Keeper Batsman",
      finalTeam: "",
    },

    // Add more players as needed
  ];

  const teams = [
    "Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bangalore",
    "Delhi Capitals",
    "Kolkata Knight Riders",
    "Sunrisers Hyderabad",
    "Punjab Kings",
    "Rajasthan Royals",
  ];

  const handlePlayerSelect = (index) => {
    setSelectedPlayerIndex(index);
    setFinalized(false);
    setCurrentBid(100);
    setLastBiddingTeam("No bids yet");
  };

  const handleIncreaseBid = () => setCurrentBid(currentBid + 100);
  const handleDecreaseBid = () => setCurrentBid(Math.max(0, currentBid - 100));

  // Check if a player is selected before finalizing
  const handleFinalize = () => {
    if (selectedPlayerIndex === null) {
      alert("Please select a player before finalizing the bid.");
      return;
    }
    setFinalized(true);
  };

  return (
    <div className="auction-admin-live-bid">
      <h1 className="auction-h1-header">Admin Live Auction - MPL</h1>
      <div className="auction-bid-container">
        <div className="auction-player-list">
          {players.map((player, index) => (
            <div
              key={index}
              className={`small-profile-item ${
                selectedPlayerIndex === index ? "highlighted" : ""
              }`} // Apply selected class
              onClick={() => handlePlayerSelect(index)}
            >
              <img
                src={player.profileImg}
                alt="player-img"
                className="small-profile-image"
              />
              <p>{player.name}</p>
              <p>{player.position}</p>
            </div>
          ))}
        </div>
        <div className="auction-bid-section">
          <h3 className="auction-live-status">Live</h3>
          <div className="auction-player-details">
            <img
              src={
                selectedPlayerIndex !== null
                  ? players[selectedPlayerIndex].profileImg
                  : null
              }
              alt="Player"
              className="auction-player-image"
            />
            <div className="player-info-details">
              <h2 className="auction-h2-header">
                {selectedPlayerIndex !== null
                  ? players[selectedPlayerIndex].name
                  : "Select a player"}
              </h2>
              <p>
                <strong>Age:</strong>{" "}
                {selectedPlayerIndex !== null
                  ? players[selectedPlayerIndex].age
                  : ""}
              </p>
              <p>
                <strong>Position:</strong>{" "}
                {selectedPlayerIndex !== null
                  ? players[selectedPlayerIndex].position
                  : ""}
              </p>
              <p>
                <strong>Current Bid:</strong> ₹ {currentBid}
              </p>
              <p>
                <strong>Highest Bidder:</strong> {lastBiddingTeam}
              </p>
            </div>
          </div>
          <div className="control-buttons">
            <h3 className="auction-h3-header">Select Team for Bidding</h3>
            <div className="team-button-container">
              {teams.map((team, index) => (
                <button key={index} onClick={() => setLastBiddingTeam(team)}>
                  {team}
                </button>
              ))}
            </div>
            <div className="bid-control-buttons">
              <button onClick={handleIncreaseBid}>Increase Bid</button>
              <button onClick={handleDecreaseBid}>Decrease Bid</button>
              <button onClick={handleFinalize}>Finalize Bid</button>
            </div>
          </div>
          {finalized && selectedPlayerIndex !== null && (
            <div className="auction-final-bid">
              <h3 className="auction-h3-header">Final Bidding</h3>
              <p>Player: {players[selectedPlayerIndex].name}</p>
              <p>Sold Out By: {lastBiddingTeam}</p>
              <p>Sold Out Price: ₹ {currentBid}</p>
              <p>
                <strong>Congratulations:</strong>{" "}
                {players[selectedPlayerIndex].name} 🎊🥳
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
