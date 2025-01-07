import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./AdminDesign/AdminLiveAuction.css";
import { toast } from "react-toastify";


// Connect to Socket.IO server

const socket = io("https://mpl-backend-5gc6.onrender.com/");

export const AdminLiveAuction = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(200);
  const [lastBiddingTeam, setLastBiddingTeam] = useState("No bids yet");
  const [filterPosition, setFilterPosition] = useState("All");
  const [finalized, setFinalized] = useState(false);

  const teams = [
    "Vishwanath warriors",
    "Dipak Warriors",
    "Black Panthers",
    "Shree Yodha",
    "Vishnu Blaster",
    "Jagan Super Strikers",
  ];

  // Fetch players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://mpl-backend-5gc6.onrender.com/api/user/allUsers"
        );
        const data = await response.json();
        if (data.success) {
          setPlayers(
            data.user.map((user) => ({
              id: user._id,
              profileImg: user.passPhoto || "/default-profile.png",
              name: user.name || "Unknown Player",
              age: user.age,
              position:
                user.position.charAt(0).toUpperCase() + user.position.slice(1),
              finalTeam: "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // Filter players by position
  const filteredPlayers =
    filterPosition === "All"
      ? players
      : players.filter((player) => player.position === filterPosition);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setCurrentBid(200);
    setLastBiddingTeam("No bids yet");
    setFinalized(false);
    socket.emit("selectPlayer", {
      player,
      lastBiddingTeam: "No bids yet",
    });
  };

  const handleBidChange = (amount) => {
    if (!selectedPlayer) {
      alert("Please select a player to place a bid.");
      return;
    }
    const newBid = Math.max(0, currentBid + amount);
    setCurrentBid(newBid);
    socket.emit("updateBid", {
      player: selectedPlayer,
      currentBid: newBid,
      lastBiddingTeam,
    });
  };

  const handleTeamSelect = (team) => {
    setLastBiddingTeam(team);
    if (selectedPlayer) {
      socket.emit("updateBid", {
        player: selectedPlayer,
        currentBid,
        lastBiddingTeam: team,
      });
    }
  };

  const handleFinalizeBid = async () => {
    if (!selectedPlayer) {
      alert("Please select a player to finalize.");
      return;
    }
    if (lastBiddingTeam === "No bids yet") {
      alert("Please select a team before finalizing the bid.");
      return;
    }

    // API call to finalize bid
    try {
      const payload = {
        name: selectedPlayer.name,
        position: selectedPlayer.position,
        currentBid,
        lastBiddingTeam,
        age: selectedPlayer.age,
      };
      const response = await axios.post(
        "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/addfinalisedbidding",
        payload
      );
      if (response.status === 201) {
        toast.success("Bid finalized and saved successfully");
        setFinalized(true);
        socket.emit("finalizeBid", {
          player: selectedPlayer,
          finalBid: currentBid,
        });
      }
    } catch (error) {
      toast.error("Error finalizing bid: " + error.message);
    }
  };

  if (loading) return <div>Loading players...</div>;

  return (
    <div className="auction-admin-live-bid">
      <h1>Admin Live Auction</h1>

      <div className="filter-dropdown">
        <label htmlFor="position-filter">Filter by Position:</label>
        <select
          id="position-filter"
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="Allrounder">All-Rounder</option>
          <option value="KeeperBatsman">Wicket-Keeper</option>
        </select>
      </div>
     

      <div className="auction-bid-container">
        {/* Players List */}
        <div className="auction-player-list">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className={`small-profile-item ${
                selectedPlayer?.id === player.id ? "highlighted" : ""
              }`}
              onClick={() => handlePlayerSelect(player)}
            >
              <img
                src={player.profileImg}
                alt={player.name}
                className="small-profile-image"
              />
              <p>{player.name}</p>
              <p className="player-position">{player.position}</p>
            </div>
          ))}
        </div>

        {/* Bid Section */}
        <div className="auction-bid-section">
          <h3>Live Auction</h3>
          {selectedPlayer ? (
            <div>
              <img
                src={selectedPlayer.profileImg}
                alt={selectedPlayer.name}
                className="auction-player-image"
              />
              <h4>{selectedPlayer.name}</h4>
              <p>Age: {selectedPlayer.age}</p>
              <p>Position: {selectedPlayer.position}</p>
              <p>Current Bid: ₹ {currentBid}</p>
              <p>Highest Bidder: {lastBiddingTeam}</p>
            </div>
          ) : (
            <p>Please select a player to start bidding.</p>
          )}
          <div className="team-button-container">
            {teams.map((team, index) => (
              <a
                key={index}
                onClick={() => handleTeamSelect(team)}
                className="teams-btn"
              >
                {team}
              </a>
            ))}
          </div>

          <div className="bid-control-buttons">
            <a className="Increase-btn" onClick={() => handleBidChange(20)}>
              Increase Bid
            </a>
            <a className="Decrease-btn" onClick={() => handleBidChange(-20)}>
              Decrease Bid
            </a>
            <a className="Finalize-btn" onClick={handleFinalizeBid}>
              Finalize Bid
            </a>
          </div>
          
          {finalized && selectedPlayer && (
            <div className="finalized-bid">
              <h4>Bid Finalized</h4>
              <p>Player: {selectedPlayer.name}</p>
              <p>Sold To: {lastBiddingTeam}</p>
              <p>Final Bid: ₹ {currentBid}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
