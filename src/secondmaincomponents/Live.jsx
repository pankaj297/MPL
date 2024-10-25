import React from "react";
import { LiveAuction } from "../components/LiveAuction";

export const Live = () => {
  const player = {
    profileImg: "./images/virat-kohli.jpg",
    name: "Virat Kohli",
    position: "Batsman",
    currentBid: 1500000,
    lastBiddingTeam: "Royal Challengers Bangalore",
    finalTeam: "Royal Challengers Bangalore",
    finalPrice: 2500000,
  };

  return (
    <div>
      <LiveAuction player={player} />
    </div>
  );
};
