import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to Socket.IO server
const socket = io("http://localhost:8000");

export const AdminLiveAuction = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);

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

  useEffect(() => {
    // Fetch players data from MongoDB via backend
    fetch("https://mpl-backend-5gc6.onrender.com/api/user/allUsers")
      .then((response) => response.json())
      .then((data) => setPlayers(data.user))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  console.log("players is fetched ", players);
  console.log("players users ", players);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setCurrentBid(100); // Starting bid
    socket.emit("selectPlayer", player); // Emit event to notify frontend
  };

  const handleBidChange = (amount) => {
    const newBid = Math.max(0, currentBid + amount); // Calculate the new bid value
    setCurrentBid(newBid); // Update the state
    socket.emit("updateBid", { player: selectedPlayer, currentBid: newBid }); // Emit the updated bid
  };

  const handleFinalizeBid = () => {
    if (!selectedPlayer) {
      alert("No player selected.");
      return;
    }
    socket.emit("finalizeBid", {
      player: selectedPlayer,
      finalBid: currentBid,
    });
    alert(`Bid finalized for ${selectedPlayer.name} at ₹${currentBid}`);
  };

  return (
    <div>
      <h2>Admin Live Auction</h2>
      <div>
        <h3>Players List:</h3>
        {players.length === 0 ? (
          <div>Loading players...</div>
        ) : (
          players.map((player) => (
            <button key={player._id} onClick={() => handlePlayerSelect(player)}>
              {player.name}
            </button>
          ))
        )}
      </div>

      {selectedPlayer && (
        <div>
          <h3>Current Player: {selectedPlayer.name}</h3>
          <p>Current Bid: ₹{currentBid}</p>
          <button onClick={() => handleBidChange(100)}>Increase Bid</button>
          <button onClick={() => handleBidChange(-100)}>Decrease Bid</button>
          <button onClick={handleFinalizeBid}>Finalize Bid</button>
        </div>
      )}
    </div>
  );
};


// import React, { useEffect, useState } from "react";
// import "./AdminDesign/AdminLiveAuction.css";

// export const AdminLiveAuction = () => {
//   const [currentBid, setCurrentBid] = useState();
//   const [lastBiddingTeam, setLastBiddingTeam] = useState("No Bidder");
//   const [finalized, setFinalized] = useState(false);
//   const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Store player ID
//   const [players, setPlayers] = useState([]); // Initialize players state
//   const [loading, setLoading] = useState(true); // Initialize loading state
//   const [filterPosition, setFilterPosition] = useState("All"); // Filter state for position

//   const teams = [
//     "Chennai Super Kings",
//     "Mumbai Indians",
//     "Royal Challengers Bangalore",
//     "Delhi Capitals",
//     "Kolkata Knight Riders",
//     "Sunrisers Hyderabad",
//     "Punjab Kings",
//     "Rajasthan Royals",
//   ];

//   // Fetch players from the API
//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await fetch(
//           "https://mpl-backend-5gc6.onrender.com/api/user/allUsers"
//         );
//         const data = await response.json();

//         if (data.success) {
//           // Map the user data to the format you want
//           const mappedPlayers = data.user.map((user) => ({
//             id: user._id,
//             profileImg: user.passPhoto, // Change this if you want to use a different image
//             name: user.name || "Unknown Player",
//             age: user.age,
//             position:
//               user.position.charAt(0).toUpperCase() + user.position.slice(1), // Capitalize first letter
//             finalTeam: "",
//           }));
//           setPlayers(mappedPlayers); // Set the players state
//         }
//       } catch (error) {
//         console.error("Error fetching players:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchPlayers();
//   }, []);

//   const handlePlayerSelect = (playerId) => {
//     setSelectedPlayerIndex(playerId); // Store the player's ID
//     setFinalized(false);
//     setCurrentBid(100);
//     setLastBiddingTeam("No bids yet");
//   };

//   const handleIncreaseBid = () =>
//     setCurrentBid((prevBid) => (prevBid ? prevBid + 100 : 100));
//   const handleDecreaseBid = () =>
//     setCurrentBid((prevBid) => Math.max(0, (prevBid || 0) - 100));

//   // Check if a player is selected before finalizing
//   const handleFinalize = () => {
//     if (selectedPlayerIndex === null) {
//       alert("Please select a player before finalizing the bid.");
//       return;
//     }
//     setFinalized(true);
//   };

//   // Filter players based on position
//   const filteredPlayers =
//     filterPosition === "All"
//       ? players
//       : players.filter((player) => player.position === filterPosition);

//   // Get the selected player details
//   const selectedPlayer =
//     selectedPlayerIndex !== null
//       ? players.find((player) => player.id === selectedPlayerIndex)
//       : null;

//   if (loading) {
//     return <div>Loading players...</div>; // Show a loading message while fetching
//   }

//   return (
//     <div className="auction-admin-live-bid">
//       <h1 className="auction-h1-header">Admin Live Auction - MPL</h1>
//       <div className="filter-dropdown">
//         <label htmlFor="position-filter">Filter by Position:</label>
//         <select
//           id="position-filter"
//           value={filterPosition}
//           onChange={(e) => setFilterPosition(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Batsman">Batsman</option>
//           <option value="Bowler">Bowler</option>
//           <option value="Allrounder">All-Rounder</option>
//           <option value="Keeper-batsman">Wicket-Keeper</option>
//         </select>
//       </div>
//       <div className="auction-bid-container">
//         <div className="auction-player-list">
//           {/* Render filtered players */}
//           {filteredPlayers.map((player) => (
//             <div
//               key={player.id} // Use player's ID as key
//               className={`small-profile-item ${
//                 selectedPlayerIndex === player.id ? "highlighted" : ""
//               }`} // Apply selected class
//               onClick={() => handlePlayerSelect(player.id)}
//             >
//               <img
//                 src={player.profileImg}
//                 alt="player-img"
//                 className="small-profile-image"
//               />
//               <p>{player.name}</p>
//               <p className="player-position">{player.position}</p>
//             </div>
//           ))}
//         </div>

//         <div className="auction-bid-section">
//           <h3 className="auction-live-status">Live</h3>
//           <div className="auction-player-details">
//             <img
//               src={selectedPlayer ? selectedPlayer.profileImg : null}
//               alt="Player"
//               className="auction-player-image"
//             />
//             <div className="player-info-details">
//               <h2 className="auction-h2-header">
//                 {selectedPlayer ? selectedPlayer.name : "Select a player"}
//               </h2>
//               <p>
//                 <strong>Age:</strong> {selectedPlayer ? selectedPlayer.age : ""}
//               </p>
//               <p>
//                 <strong>Position:</strong>{" "}
//                 {selectedPlayer ? selectedPlayer.position : ""}
//               </p>
//               <p>
//                 <strong>Current Bid:</strong> ₹ {currentBid}
//               </p>
//               <p>
//                 <strong>Highest Bidder:</strong> {lastBiddingTeam}
//               </p>
//             </div>
//           </div>
//           <div className="control-buttons">
//             <h3 className="auction-h3-header">Select Team for Bidding</h3>
//             <div className="team-button-container">
//               {teams.map((team, index) => (
//                 <a
//                   className="teams-btn"
//                   key={index}
//                   onClick={() => setLastBiddingTeam(team)}
//                 >
//                   {team}
//                 </a>
//               ))}
//             </div>
//             <div className="bid-control-buttons">
//               <a className="Increase-btn" onClick={handleIncreaseBid}>
//                 Increase Bid
//               </a>
//               <a className="Decrease-btn" onClick={handleDecreaseBid}>
//                 Decrease Bid
//               </a>
//               <a className="Finalize-btn" onClick={handleFinalize}>
//                 Finalize Bid
//               </a>
//             </div>
//           </div>
//           {finalized && selectedPlayer && (
//             <div className="auction_final_bid">
//               <h3 className="auction-h3-header">Final Bidding</h3>
//               <p>Player: {selectedPlayer.name}</p>
//               <p>Sold Out By: {lastBiddingTeam}</p>
//               <p>Sold Out Price: ₹ {currentBid}</p>
//               <p>
//                 <strong>Congratulations:</strong> {selectedPlayer.name} 🎊🥳
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
