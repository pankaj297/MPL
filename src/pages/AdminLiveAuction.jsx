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

  // NEW: search + sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default | nameAsc | ageAsc | ageDesc

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
                user.position && user.position.length > 0
                  ? user.position.charAt(0).toUpperCase() +
                    user.position.slice(1)
                  : "Unknown",
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

  /* ------------------------------ FILTERING + SEARCH + SORT --------------- */

  const filteredPlayers = (() => {
    let list = players;

    // filter by position
    if (filterPosition !== "All") {
      list = list.filter((player) => player.position === filterPosition);
    }

    // filter by search query (name)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((player) =>
        (player.name || "").toLowerCase().includes(q)
      );
    }

    // sort
    if (sortBy === "nameAsc") {
      list = [...list].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortBy === "ageAsc") {
      list = [...list].sort((a, b) => {
        if (!a.age && !b.age) return 0;
        if (!a.age) return 1;
        if (!b.age) return -1;
        return a.age - b.age;
      });
    } else if (sortBy === "ageDesc") {
      list = [...list].sort((a, b) => {
        if (!a.age && !b.age) return 0;
        if (!a.age) return 1;
        if (!b.age) return -1;
        return b.age - a.age;
      });
    }

    return list;
  })();

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

  /* ------------------------ EXTRA: NEXT / PREV PLAYER --------------------- */

  const handleNextPlayer = () => {
    if (!filteredPlayers.length) return;

    if (!selectedPlayer) {
      handlePlayerSelect(filteredPlayers[0]);
      return;
    }

    const currentIndex = filteredPlayers.findIndex(
      (p) => p.id === selectedPlayer.id
    );
    const nextIndex =
      currentIndex === -1 || currentIndex === filteredPlayers.length - 1
        ? 0
        : currentIndex + 1;

    handlePlayerSelect(filteredPlayers[nextIndex]);
  };

  const handlePrevPlayer = () => {
    if (!filteredPlayers.length) return;

    if (!selectedPlayer) {
      handlePlayerSelect(filteredPlayers[0]);
      return;
    }

    const currentIndex = filteredPlayers.findIndex(
      (p) => p.id === selectedPlayer.id
    );
    const prevIndex =
      currentIndex <= 0 ? filteredPlayers.length - 1 : currentIndex - 1;

    handlePlayerSelect(filteredPlayers[prevIndex]);
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

        {/* NEW: HEADER CONTROLS BAR */}
        <div className={styles.headerControls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search player name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filterRow}>
            <label htmlFor="position-filter" className={styles.filterLabel}>
              Position
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

          <div className={styles.sortRow}>
            <label htmlFor="sort-by" className={styles.filterLabel}>
              Sort
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="default">Default</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="ageAsc">Age (Youngest)</option>
              <option value="ageDesc">Age (Oldest)</option>
            </select>
          </div>

          <button
            type="button"
            className={styles.clearFiltersBtn}
            onClick={() => {
              setSearchQuery("");
              setFilterPosition("All");
              setSortBy("default");
            }}
          >
            Reset
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        {/* LEFT: PLAYER LIST */}
        <aside className={styles.playerPanel}>
          <div className={styles.playerPanelHeader}>
            <h3 className={styles.panelTitle}>Players</h3>
            <div className={styles.playerSummaryRow}>
              <span className={styles.playerCount}>
                {filteredPlayers.length} / {players.length}
              </span>
              <div className={styles.playerNavButtons}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrevPlayer}
                  disabled={!filteredPlayers.length}
                >
                  ◀
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handleNextPlayer}
                  disabled={!filteredPlayers.length}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

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
              <p className={styles.emptyText}>No players found.</p>
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
