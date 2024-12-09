import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to Socket.IO server
const socket = io.connect("http://localhost:8000");

export const LiveAuction = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);

  useEffect(() => {
    // Listen for player selection
    socket.on("playerSelected", (player) => {
      setSelectedPlayer(player);
      setCurrentBid(100); // Starting bid
    });

    // Listen for bid update
    socket.on("bidUpdated", (data) => {
      if (selectedPlayer && data.player._id === selectedPlayer._id) {
        setCurrentBid(data.currentBid);
      }
    });

    // Listen for bid finalization
    socket.on("bidFinalized", (data) => {
      if (data.player._id === selectedPlayer._id) {
        alert(`Bid finalized for ${data.player.name} at ₹${data.finalBid}`);
      }
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off("playerSelected");
      socket.off("bidUpdated");
      socket.off("bidFinalized");
    };
  }, [selectedPlayer]);

  return (
    <div>
      <h2>Live Auction</h2>
      {selectedPlayer ? (
        <div>
          <h3>Current Player: {selectedPlayer.name}</h3>
          <p>Current Bid: ₹{currentBid}</p>
        </div>
      ) : (
        <p>No player selected yet.</p>
      )}
    </div>
  );
};

// import React, { useState } from "react";
// import "./design/LiveAuction.css";

// export const LiveAuction = () => {
//   const [showFinalBid, setShowFinalBid] = useState(false);

//   // Sample player data
//   const player = {
//     profileImg: "./images/baban.jpeg",
//     name: "Baban Ratilal Naik",
//     age: 21,
//     position: "All Rounder",
//     currentBid: 1500,
//     lastBiddingTeam: "Chennai Super Kings",
//     finalTeam: "Chennai Super Kings",
//     finalPrice: 1500,
//   };

//   return (
//     <>
//       <div className="live-auction-page">
//         <div className="live-player-profile">
//           <h1 className="user-live-auction-h1heading">Live Auction Of MPL</h1>
//           <div className="player-profile">
//             <div className="profile-header">
//               <div className="live-img">
//                 <img
//                   src={player.profileImg}
//                   alt={`${player.name}'s profile`}
//                   className="live-profile-img"
//                 />
//               </div>
//               <div className="profile-info">
//                 <h2 className="user-live-auction-h2-heading">{player.name}</h2>
//                 <p>
//                   <span className="bold-text">Age :</span> {player.age}{" "}
//                 </p>
//                 <p className="player-position">
//                   {" "}
//                   <span className="bold-text">Position :</span>{" "}
//                   {player.position}
//                 </p>
//                 <p className="bidding-price">
//                   Current Bid : ₹ {player.currentBid}
//                 </p>
//                 <p className="last-team">
//                   <span className="bold-text"> Highest Bidder : </span>
//                   {player.lastBiddingTeam}
//                 </p>
//               </div>
//             </div>

//             <div className="final-bid">
//               <h2 className="user-live-auction-h2-heading">Final Bidding</h2>
//               <p>Player : {player.name}</p>
//               <p>Sold Out By : {player.finalTeam}</p>
//               <p>Sold Out Price : ₹ {player.finalPrice}</p>
//               <p>
//                 <span className="bold-text">Congratulation : </span>{" "}
//                 {player.name} 🎊🥳
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
