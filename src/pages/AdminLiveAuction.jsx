// src/components/AdminLiveAuction.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./AdminDesign/AdminLiveAuction.module.css";

const socket = io("https://mpl-backend-5gc6.onrender.com/", {
  transports: ["websocket", "polling"],
});

const INITIAL_PURSE = 6000;
const BASE_PRICE = 200;
const MIN_PLAYERS = 12;

const TEAM_NAMES = [
  "Vishwanath warriors",
  "Dipak Warriors",
  "Jijau fighter",
  "Mata Nagar",
  "KB Kings",
  "Ram Rajya Pratishthan",
  "Malkheda Sunrisers",
  "Jagan Suparstaikar",
];

const normalizeTeam = (name = "") => name.trim().toLowerCase();

const createInitialTeamsState = () =>
  TEAM_NAMES.reduce((acc, name) => {
    acc[name] = {
      name,
      purse: INITIAL_PURSE,
      playersCount: 0,
    };
    return acc;
  }, {});

export const AdminLiveAuction = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teamsState, setTeamsState] = useState(createInitialTeamsState);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(BASE_PRICE);
  const [lastBiddingTeam, setLastBiddingTeam] = useState("No bids yet");
  const [filterPosition, setFilterPosition] = useState("All");
  const [finalized, setFinalized] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Search + sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default | nameAsc | ageAsc | ageDesc

  /* ------------------------ PURSE & MAX BID RULES ------------------------ */

  const getTeamMaxAllowedBid = useCallback((teamData) => {
    if (!teamData) return 0;
    if (teamData.playersCount >= MIN_PLAYERS) return 0;

    // Players still needed AFTER this current player to reach MIN_PLAYERS (12)
    const playersNeededAfterCurrent = Math.max(
      0,
      MIN_PLAYERS - teamData.playersCount - 1,
    );
    const reservedForRemainingPlayers = playersNeededAfterCurrent * BASE_PRICE;

    return Math.max(0, teamData.purse - reservedForRemainingPlayers);
  }, []);

  const getTeamBidStatus = useCallback(
    (teamName, bidAmount = currentBid) => {
      const teamData = teamsState[teamName];
      if (!teamData) {
        return { allowed: false, maxBid: 0, reason: "Team not found" };
      }

      if (teamData.playersCount >= MIN_PLAYERS) {
        return {
          allowed: false,
          maxBid: 0,
          reason: `Minimum ${MIN_PLAYERS} players reached`,
        };
      }

      const maxBid = getTeamMaxAllowedBid(teamData);
      const playersNeededAfterCurrent = Math.max(
        0,
        MIN_PLAYERS - teamData.playersCount - 1,
      );
      const reservedAmount = playersNeededAfterCurrent * BASE_PRICE;

      if (maxBid < BASE_PRICE || bidAmount > maxBid) {
        return {
          allowed: false,
          maxBid,
          reason: `Max ₹${maxBid} (Keep ₹${reservedAmount} for ${playersNeededAfterCurrent} players @ ₹${BASE_PRICE})`,
        };
      }

      return {
        allowed: true,
        maxBid,
        reason: `Max ₹${maxBid}`,
      };
    },
    [currentBid, getTeamMaxAllowedBid, teamsState],
  );

  const teamList = useMemo(() => Object.values(teamsState), [teamsState]);

  /* ----------------------- FETCH PLAYERS & EXISTING BIDS ------------------ */

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, biddingsRes] = await Promise.all([
          fetch("https://mpl-backend-5gc6.onrender.com/api/user/allUsers"),
          fetch(
            "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings",
          ),
        ]);

        const usersData = await usersRes.json();
        const biddingsData = await biddingsRes.json();
        const finalizedList = Array.isArray(biddingsData)
          ? biddingsData
          : biddingsData.data || biddingsData.biddings || [];

        const syncedTeams = createInitialTeamsState();
        finalizedList.forEach((entry) => {
          const entryTeamNorm = normalizeTeam(entry.lastBiddingTeam);
          const matchedKey = Object.keys(syncedTeams).find(
            (k) => normalizeTeam(k) === entryTeamNorm,
          );
          if (matchedKey) {
            syncedTeams[matchedKey].purse = Math.max(
              0,
              syncedTeams[matchedKey].purse - (Number(entry.currentBid) || 0),
            );
            syncedTeams[matchedKey].playersCount += 1;
          }
        });
        setTeamsState(syncedTeams);

        const soldNames = new Set(
          finalizedList.map((b) => (b.name || "").trim().toLowerCase()),
        );

        if (usersData.success) {
          setPlayers(
            usersData.user.map((user) => ({
              id: user._id,
              profileImg: user.passPhoto || "/default-profile.png",
              name: user.name || "Unknown Player",
              age: user.age,
              position:
                user.position && user.position.length > 0
                  ? user.position.charAt(0).toUpperCase() +
                    user.position.slice(1)
                  : "Unknown",
              isSold: soldNames.has((user.name || "").trim().toLowerCase()),
              finalTeam: "",
            })),
          );
        } else {
          toast.error("Failed to load players");
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
        toast.error("Error fetching auction data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  /* ------------------------------ FILTERING + SEARCH + SORT --------------- */

  const filteredPlayers = useMemo(() => {
    let list = players;

    if (filterPosition !== "All") {
      list = list.filter((player) => player.position === filterPosition);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((player) =>
        (player.name || "").toLowerCase().includes(q),
      );
    }

    if (sortBy === "nameAsc") {
      list = [...list].sort((a, b) =>
        (a.name || "").localeCompare(b.name || ""),
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
  }, [players, filterPosition, searchQuery, sortBy]);

  /* ----------------------------- AUCTION LOGIC ---------------------------- */

  const handlePlayerSelect = useCallback((player) => {
    setSelectedPlayer(player);
    setCurrentBid(BASE_PRICE);
    setLastBiddingTeam("No bids yet");
    setFinalized(false);
    setIsFinalizing(false);

    socket.emit("selectPlayer", {
      player,
      currentBid: BASE_PRICE,
      lastBiddingTeam: "No bids yet",
    });
  }, []);

  const handleBidChange = useCallback(
    (amount) => {
      if (!selectedPlayer) {
        toast.info("Select a player first.");
        return;
      }
      if (finalized || isFinalizing) {
        return;
      }

      const newBid = Math.max(BASE_PRICE, currentBid + amount);

      if (lastBiddingTeam !== "No bids yet" && amount > 0) {
        const status = getTeamBidStatus(lastBiddingTeam, newBid);
        if (!status.allowed) {
          toast.warning(
            `${lastBiddingTeam} cannot bid ₹${newBid}. ${status.reason}`,
          );
          return;
        }
      }

      setCurrentBid(newBid);

      socket.emit("updateBid", {
        player: selectedPlayer,
        currentBid: newBid,
        lastBiddingTeam,
      });
    },
    [
      selectedPlayer,
      finalized,
      isFinalizing,
      currentBid,
      lastBiddingTeam,
      getTeamBidStatus,
    ],
  );

  const handleTeamSelect = useCallback(
    (teamName) => {
      if (finalized || isFinalizing) return;

      if (!selectedPlayer) {
        toast.info("Select a player first.");
        return;
      }

      const status = getTeamBidStatus(teamName, currentBid);
      if (!status.allowed) {
        toast.warning(`${teamName} cannot bid: ${status.reason}`);
        return;
      }

      setLastBiddingTeam(teamName);
      socket.emit("updateBid", {
        player: selectedPlayer,
        currentBid,
        lastBiddingTeam: teamName,
      });
    },
    [finalized, isFinalizing, selectedPlayer, getTeamBidStatus, currentBid],
  );

  const handleFinalizeBid = useCallback(async () => {
    if (isFinalizing || finalized) {
      return;
    }
    if (!selectedPlayer) {
      toast.info("Select a player to finalize.");
      return;
    }
    if (lastBiddingTeam === "No bids yet") {
      toast.info("Select a team before finalizing.");
      return;
    }

    const status = getTeamBidStatus(lastBiddingTeam, currentBid);
    if (!status.allowed) {
      toast.error(`Cannot finalize: ${lastBiddingTeam} — ${status.reason}`);
      return;
    }

    setIsFinalizing(true);

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
        payload,
      );

      if (response.status === 201 || response.status === 200) {
        setTeamsState((prev) => {
          const currentTeam = prev[lastBiddingTeam];
          if (!currentTeam) return prev;
          return {
            ...prev,
            [lastBiddingTeam]: {
              ...currentTeam,
              purse: currentTeam.purse - currentBid,
              playersCount: currentTeam.playersCount + 1,
            },
          };
        });

        setPlayers((prev) =>
          prev.map((p) =>
            p.id === selectedPlayer.id ? { ...p, isSold: true } : p,
          ),
        );

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
    } finally {
      setIsFinalizing(false);
    }
  }, [
    isFinalizing,
    finalized,
    selectedPlayer,
    lastBiddingTeam,
    getTeamBidStatus,
    currentBid,
  ]);

  /* ------------------------ EXTRA: NEXT / PREV PLAYER --------------------- */

  const handleNextPlayer = () => {
    if (!filteredPlayers.length) return;

    if (!selectedPlayer) {
      handlePlayerSelect(filteredPlayers[0]);
      return;
    }

    const currentIndex = filteredPlayers.findIndex(
      (p) => p.id === selectedPlayer.id,
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
      (p) => p.id === selectedPlayer.id,
    );
    const prevIndex =
      currentIndex <= 0 ? filteredPlayers.length - 1 : currentIndex - 1;

    handlePlayerSelect(filteredPlayers[prevIndex]);
  };

  /* --------------------------- KEYBOARD SHORTCUTS ------------------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
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
        handleBidChange(60);
      } else if (e.key === "-") {
        e.preventDefault();
        handleBidChange(-60);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleFinalizeBid();
      } else if (/^[1-8]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        if (TEAM_NAMES[idx]) {
          e.preventDefault();
          handleTeamSelect(TEAM_NAMES[idx]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBidChange, handleFinalizeBid, handleTeamSelect]);

  /* ----------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <span className={styles.spinner} />
        <p>Loading players...</p>
      </div>
    );
  }

  const finalizeButtonLabel = isFinalizing
    ? "Finalizing..."
    : finalized
      ? "Bid Finalized ✓"
      : "Finalize Bid (Enter)";

  return (
    <div className={styles.liveAuction}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Live Auction</h1>
          <p className={styles.subtitle}>
            Total Purse ₹{INITIAL_PURSE} · Min {MIN_PLAYERS} Players · Base
            Price ₹{BASE_PRICE} · ↑ +₹20 · ↓ −₹20 · +/− ±₹60 · 1–8 team · Enter
            finalize
          </p>
        </div>

        {/* HEADER CONTROLS BAR */}
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
                  <span className={styles.playerName}>
                    {player.name} {player.isSold ? "(Sold)" : ""}
                  </span>
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
                  <h3 className={styles.sectionTitle}>
                    Select Team (Purse & Max Bid Protected)
                  </h3>
                  <div className={styles.teamButtons}>
                    {teamList.map((team, index) => {
                      const status = getTeamBidStatus(team.name, currentBid);
                      const isDisabled =
                        finalized || isFinalizing || !status.allowed;

                      return (
                        <button
                          key={team.name}
                          type="button"
                          disabled={isDisabled}
                          title={status.reason}
                          className={`${styles.teamButton} ${
                            lastBiddingTeam === team.name
                              ? styles.teamButtonActive
                              : ""
                          }`}
                          onClick={() => handleTeamSelect(team.name)}
                        >
                          <span className={styles.teamKey}>{index + 1}</span>
                          <span>
                            {team.name} · ₹{team.purse} ({team.playersCount}/
                            {MIN_PLAYERS}) · Max ₹{status.maxBid}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* BID CONTROLS */}
                <section className={styles.controlsSection}>
                  <h3 className={styles.sectionTitle}>Bid Controls</h3>
                  <div className={styles.bidButtonsRow}>
                    <button
                      type="button"
                      disabled={finalized || isFinalizing}
                      className={styles.controlBtnGreen}
                      onClick={() => handleBidChange(20)}
                    >
                      +₹20 (↑)
                    </button>
                    <button
                      type="button"
                      disabled={finalized || isFinalizing}
                      className={styles.controlBtnGreen}
                      onClick={() => handleBidChange(60)}
                    >
                      +₹60 (+)
                    </button>
                    <button
                      type="button"
                      disabled={finalized || isFinalizing}
                      className={styles.controlBtnRed}
                      onClick={() => handleBidChange(-20)}
                    >
                      −₹20 (↓)
                    </button>
                    <button
                      type="button"
                      disabled={finalized || isFinalizing}
                      className={styles.controlBtnRed}
                      onClick={() => handleBidChange(-60)}
                    >
                      −₹60 (−)
                    </button>
                  </div>

                  <div className={styles.finalizeRow}>
                    <button
                      type="button"
                      disabled={isFinalizing || finalized}
                      aria-busy={isFinalizing}
                      className={styles.finalizeBtn}
                      onClick={handleFinalizeBid}
                    >
                      {finalizeButtonLabel}
                    </button>
                    <span className={styles.hintText}>
                      {isFinalizing
                        ? "Saving finalized bid..."
                        : finalized
                          ? "Player already finalized. Select next player to continue."
                          : "Teams that cannot afford ₹200 base price for remaining players are blocked."}
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
