import React, { useState } from "react";
import "./AdminDesign/AdminLiveAuction.css";

export const AdminLiveAuction = () => {
  const [currentBid, setCurrentBid] = useState(1500);
  const [lastBiddingTeam, setLastBiddingTeam] = useState("Chennai Super Kings");
  const [finalized, setFinalized] = useState(false);

  const player = {
    profileImg: "./images/baban.jpeg",
    name: "Baban Ratilal Naik",
    age: 21,
    position: "All Rounder",
    finalTeam: lastBiddingTeam,
    finalPrice: currentBid,
  };

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

  const handleIncreaseBid = () => setCurrentBid(currentBid + 100);
  const handleDecreaseBid = () => setCurrentBid(Math.max(0, currentBid - 100));
  const handleFinalize = () => setFinalized(true);

  return (
    <div className="admin-live-auction">
      <h1 className="live-h1heading">Admin Live Auction - MPL</h1>
      <div className="auction-container">
        <h3 className="live-live">Live</h3>
        <div className="player-profile">
          <img src={player.profileImg} alt="Player" className="player-img" />
          <div className="player-info">
            <h2 className="live-h2heading">{player.name}</h2>
            <p>
              <strong>Age:</strong> {player.age}
            </p>
            <p>
              <strong>Position:</strong> {player.position}
            </p>
            <p>
              <strong>Current Bid:</strong> ₹ {currentBid}
            </p>
            <p>
              <strong>Highest Bidder:</strong> {lastBiddingTeam}
            </p>
          </div>
        </div>
        <div className="controls">
          <h3 className="live-h3heading">Select Team for Bidding</h3>
          <div className="team-buttons">
            {teams.map((team, index) => (
              <button key={index} onClick={() => setLastBiddingTeam(team)}>
                {team}
              </button>
            ))}
          </div>
          <div className="bid-controls">
            <button onClick={handleIncreaseBid}>Increase Bid</button>
            <button onClick={handleDecreaseBid}>Decrease Bid</button>
            <button onClick={handleFinalize}>Finalize Bid</button>
          </div>
        </div>
        {finalized && (
          <div className="final-bid">
            <h3 className="live-h3heading">Final Bidding</h3>
            <p>Player: {player.name}</p>
            <p>Sold Out By: {player.finalTeam}</p>
            <p>Sold Out Price: ₹ {player.finalPrice}</p>
            <p>
              <strong>Congratulations:</strong> {player.name} 🎊🥳
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
