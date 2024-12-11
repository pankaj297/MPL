import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./design/LiveAuction.css";
import { toast } from "react-toastify";

// Connect to Socket.IO server
const socket = io.connect("https://mpl-backend-5gc6.onrender.com/");

export const LiveAuction = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(200); // Set default bid to 200
  const [lastBiddingTeam, setLastBiddingTeam] = useState("No bids yet");
  const [isbidFinalised, setIsBidFinalised] = useState(false);

  useEffect(() => {
    // Listen for player selection
    socket.on("playerSelected", (data) => {
      setIsBidFinalised(false);
      setSelectedPlayer(data.player);
      setCurrentBid(data.player.startingBid || 200); // Default bid corrected to use player's startingBid or fallback to 200
      setLastBiddingTeam(data.lastBiddingTeam || "No bids yet");
    });

    // Listen for bid update
    socket.on("bidUpdated", (data) => {
      if (selectedPlayer && data.player._id === selectedPlayer._id) {
        setCurrentBid(data.currentBid);
        setLastBiddingTeam(data.lastBiddingTeam || "Unknown Team");
      }
    });

    // Listen for bid finalization
    socket.on("bidFinalized", (data) => {
      if (data.player._id === selectedPlayer._id) {
        setIsBidFinalised(true);
        toast.success(
          `Bid finalized for ${data.player.name} at ₹${data.finalBid}`
        );
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
    <div className="live-auction-page">
      <div className="live-player-profile">
        <h1 className="user-live-auction-h1heading">MPL Live Auction </h1>
        {selectedPlayer ? (
          <div className="player-profile">
            <div className="profile-header">
              <div className="live-img">
                <img
                  src={selectedPlayer.profileImg || "./images/default.jpeg"}
                  alt={`${selectedPlayer.name}'s profile`}
                  className="live-profile-img"
                />
              </div>
              <div className="profile-info">
                <h2 className="user-live-auction-h2-heading">
                  {selectedPlayer.name}
                </h2>
                <p>
                  <span className="bold-text">Age :</span>{" "}
                  {selectedPlayer.age || "N/A"}
                </p>
                <p className="player-position">
                  <span className="bold-text">Position :</span>{" "}
                  {selectedPlayer.position || "Unknown"}
                </p>
                <p className="bidding-price">Current Bid : ₹ {currentBid}</p>
                <p className="last-team">
                  <span className="bold-text">Highest Bidder :</span>{" "}
                  {lastBiddingTeam}
                </p>
              </div>
            </div>

            {isbidFinalised ? (
              <div className="final-bid">
                <h2 className="user-live-auction-h2-heading">Final Bidding</h2>
                <p>Player : {selectedPlayer.name}</p>
                <p>Sold Out By : {lastBiddingTeam || "N/A"}</p>
                <p>Sold Out Price : ₹ {currentBid}</p>
                <p>
                  <span className="bold-text">Congratulation :</span>{" "}
                  {selectedPlayer.name} 🎊🥳
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <p className="no-player-message">No player selected yet.</p>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

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
