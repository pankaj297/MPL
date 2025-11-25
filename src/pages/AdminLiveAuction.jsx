// src/components/AdminLiveAuction.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./AdminDesign/AdminLiveAuction.module.css";

const socket = io("https://mpl-backend-5gc6.onrender.com/", {
  transports: ["websocket", "polling"],
});

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
    "Jijau fighter",
    "Mato Shree Group",
    "Vishnu Blaster",
    "Ram Rajya Pratishthan",
  ];

  /* ----------------------------- FETCH PLAYERS ---------------------------- */

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
        } else {
          toast.error("Failed to load players");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        toast.error("Error fetching players");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  /* ------------------------------ FILTERING ------------------------------- */

  const filteredPlayers =
    filterPosition === "All"
      ? players
      : players.filter((player) => player.position === filterPosition);

  /* ----------------------------- AUCTION LOGIC ---------------------------- */

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
      toast.info("Select a player first.");
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
      toast.info("Select a player to finalize.");
      return;
    }
    if (lastBiddingTeam === "No bids yet") {
      toast.info("Select a team before finalizing.");
      return;
    }

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
          lastBiddingTeam,
        });
      }
    } catch (error) {
      toast.error("Error finalizing bid: " + error.message);
    }
  };

  /* --------------------------- KEYBOARD SHORTCUTS ------------------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore when typing in inputs
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleBidChange(20);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleBidChange(-20);
      } else if (e.key === "+") {
        e.preventDefault();
        handleBidChange(50);
      } else if (e.key === "-") {
        e.preventDefault();
        handleBidChange(-50);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleFinalizeBid();
      } else if (/^[1-6]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        if (teams[idx]) {
          e.preventDefault();
          handleTeamSelect(teams[idx]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlayer, currentBid, lastBiddingTeam, teams]);

  /* ----------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <span className={styles.spinner} />
        <p>Loading players...</p>
      </div>
    );
  }

  return (
    <div className={styles.liveAuction}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Live Auction</h1>
          <p className={styles.subtitle}>
            Fast controls: ↑ +₹20 · ↓ −₹20 · +/− ±₹50 · 1–6 select team · Enter
            finalize
          </p>
        </div>

        <div className={styles.filterRow}>
          <label htmlFor="position-filter" className={styles.filterLabel}>
            Filter by position
          </label>
          <select
            id="position-filter"
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="Allrounder">All-Rounder</option>
            <option value="KeeperBatsman">Wicket-Keeper</option>
          </select>
        </div>
      </header>

      <div className={styles.layout}>
        {/* LEFT: PLAYER LIST */}
        <aside className={styles.playerPanel}>
          <h3 className={styles.panelTitle}>Players</h3>
          <div className={styles.playerList}>
            {filteredPlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                className={`${styles.playerItem} ${
                  selectedPlayer?.id === player.id
                    ? styles.playerItemActive
                    : ""
                }`}
                onClick={() => handlePlayerSelect(player)}
              >
                <img
                  src={player.profileImg}
                  alt={player.name}
                  className={styles.playerAvatar}
                />
                <div className={styles.playerMeta}>
                  <span className={styles.playerName}>{player.name}</span>
                  <span className={styles.playerInfo}>
                    {player.position} · {player.age || "N/A"} yrs
                  </span>
                </div>
              </button>
            ))}
            {filteredPlayers.length === 0 && (
              <p className={styles.emptyText}>No players for this category.</p>
            )}
          </div>
        </aside>

        {/* RIGHT: MAIN AUCTION PANEL */}
        <main className={styles.mainPanel}>
          <section className={styles.playerCard}>
            {selectedPlayer ? (
              <>
                <div className={styles.playerCardHeader}>
                  <div className={styles.playerImageWrap}>
                    <img
                      src={selectedPlayer.profileImg}
                      alt={selectedPlayer.name}
                      className={styles.mainPlayerImage}
                    />
                  </div>
                  <div className={styles.playerCardInfo}>
                    <h2 className={styles.mainPlayerName}>
                      {selectedPlayer.name}
                    </h2>
                    <p className={styles.mainPlayerMeta}>
                      Age: {selectedPlayer.age || "N/A"} ·{" "}
                      {selectedPlayer.position}
                    </p>
                    <p className={styles.bidLabel}>
                      Current Bid <span className={styles.bidCurrency}>₹</span>
                    </p>
                    <p className={styles.currentBid}>
                      {currentBid.toLocaleString("en-IN")}
                    </p>
                    <p className={styles.highestBidderLabel}>Highest Bidder</p>
                    <p className={styles.highestBidder}>{lastBiddingTeam}</p>
                  </div>
                </div>

                {/* TEAMS */}
                <section className={styles.teamsSection}>
                  <h3 className={styles.sectionTitle}>Select Team</h3>
                  <div className={styles.teamButtons}>
                    {teams.map((team, index) => (
                      <button
                        key={team}
                        type="button"
                        className={`${styles.teamButton} ${
                          lastBiddingTeam === team
                            ? styles.teamButtonActive
                            : ""
                        }`}
                        onClick={() => handleTeamSelect(team)}
                      >
                        <span className={styles.teamKey}>{index + 1}</span>
                        <span>{team}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* BID CONTROLS */}
                <section className={styles.controlsSection}>
                  <h3 className={styles.sectionTitle}>Bid Controls</h3>
                  <div className={styles.bidButtonsRow}>
                    <button
                      type="button"
                      className={styles.controlBtnGreen}
                      onClick={() => handleBidChange(20)}
                    >
                      +₹20 (↑)
                    </button>
                    <button
                      type="button"
                      className={styles.controlBtnGreen}
                      onClick={() => handleBidChange(50)}
                    >
                      +₹50 (+)
                    </button>
                    <button
                      type="button"
                      className={styles.controlBtnRed}
                      onClick={() => handleBidChange(-20)}
                    >
                      −₹20 (↓)
                    </button>
                    <button
                      type="button"
                      className={styles.controlBtnRed}
                      onClick={() => handleBidChange(-50)}
                    >
                      −₹50 (−)
                    </button>
                  </div>

                  <div className={styles.finalizeRow}>
                    <button
                      type="button"
                      className={styles.finalizeBtn}
                      onClick={handleFinalizeBid}
                    >
                      Finalize Bid (Enter)
                    </button>
                    <span className={styles.hintText}>
                      Tip: Use keyboard shortcuts for faster auctions.
                    </span>
                  </div>
                </section>

                {finalized && (
                  <section className={styles.finalizedBox}>
                    <h3>Bid Finalized</h3>
                    <p>
                      Player: <strong>{selectedPlayer.name}</strong>
                    </p>
                    <p>
                      Sold To: <strong>{lastBiddingTeam}</strong>
                    </p>
                    <p>
                      Final Bid:{" "}
                      <strong>₹ {currentBid.toLocaleString("en-IN")}</strong>
                    </p>
                  </section>
                )}
              </>
            ) : (
              <div className={styles.noPlayerSelected}>
                <p>Select a player from the left to start the auction.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
