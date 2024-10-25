import React, { useState } from "react";
import "./design/LiveAuction.css";


export const LiveAuction = ({ player }) => {
  const [showFinalBid, setShowFinalBid] = useState(false);

  const handleShowFinalBid = () => {
    setShowFinalBid(true); // Show the final bid when the button is clicked
  };

  return (
    <>
      <div className="live-player-profile">
        <h1>Live Auction Of MPL</h1>
        <div className="player-profile">
          <div className="profile-header">
            <img
              src={player.profileImg}
              alt={`${player.name}'s profile`}
              className="profile-img"
            />
            <div className="profile-info">
              <h2>{player.name}</h2>
              <p className="player-position">{player.position}</p>
              <p className="bidding-price">Current Bid: ${player.currentBid}</p>
              <p className="last-team">Last Bid by: {player.lastBiddingTeam}</p>
            </div>
          </div>

          <button className="final-bid-btn" onClick={handleShowFinalBid}>
            Show Final Bid
          </button>

          {showFinalBid && (
            <div className="final-bid">
              <h3>Final Bidding</h3>
              <p>Player: {player.name}</p>
              <p>Team: {player.finalTeam}</p>
              <p>Final Price: ${player.finalPrice}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
