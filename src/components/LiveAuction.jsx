import React, { useState } from "react";
import "./design/LiveAuction.css";

export const LiveAuction = () => {
  const [showFinalBid, setShowFinalBid] = useState(false);

  // Sample player data
  const player = {
    profileImg: "./images/virat-kohli.jpg",
    name: "Virat Kohli",
    position: "Batsman",
    currentBid: 1500000,
    lastBiddingTeam: "Royal Challengers Bangalore",
    finalTeam: "Royal Challengers Bangalore",
    finalPrice: 2500000,
  };

  const handleShowFinalBid = () => {
    setShowFinalBid(true);
  };

  return (
    <>
      <div className="live-auction-page">
        <div className="live-player-profile">
          <h1>Live Auction Of MPL</h1>
          <div className="player-profile">
            <div className="profile-header">
              <div className="live-img">
                <img
                  src={player.profileImg}
                  alt={`${player.name}'s profile`}
                  className="profile-img"
                />
              </div>
              <div className="profile-info">
                <h2>{player.name}</h2>
                <p className="player-position">{player.position}</p>
                <p className="bidding-price">
                  Current Bid: ${player.currentBid}
                </p>
                <p className="last-team">
                  Last Bid by: {player.lastBiddingTeam}
                </p>
              </div>
            </div>
        
              <div className="final-bid">
                <h3>Final Bidding</h3>
                <p>Player: {player.name}</p>
                <p>Team: {player.finalTeam}</p>
                <p>Final Price: ${player.finalPrice}</p>
              </div>
         
          </div>
        </div>
      </div>
    </>
  );
};
