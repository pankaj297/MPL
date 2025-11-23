import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./design/TopSoldOut.module.css";
import "react-toastify/dist/ReactToastify.css";

export const TopSoldOut = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const API_URL =
    "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings";

  // Generate vibrant gradient based on player name
  const generateGradient = (name) => {
    const colors = [
      ["#667eea", "#764ba2"],
      ["#f093fb", "#f5576c"],
      ["#4facfe", "#00f2fe"],
      ["#43e97b", "#38f9d7"],
      ["#fa709a", "#fee140"],
      ["#a8edea", "#fed6e3"],
      ["#5ee7df", "#b490ca"],
      ["#d299c2", "#fef9d7"],
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  // Get player initials
  const getInitials = (name) => {
    if (!name) return "PL";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Fetch sold players data
  useEffect(() => {
    const fetchSoldPlayers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, { timeout: 15000 });

        if (response.data && Array.isArray(response.data)) {
          const processedPlayers = response.data
            .filter((player) => player.currentBid && player.currentBid > 0)
            .sort((a, b) => b.currentBid - a.currentBid)
            .slice(0, 6)
            .map((player, index) => ({
              id: player._id || `player-${index}`,
              name: player.name || "Unknown Player",
              position: player.position || "All-Rounder",
              age: player.age || "N/A",
              currentBid: player.currentBid || 0,
              lastBiddingTeam: player.lastBiddingTeam || "Unsold",
              profileImg: player.profileImg || player.passPhoto || null,
              gradient: generateGradient(player.name),
              rank: index + 1,
            }));

          setPlayers(processedPlayers);
          setError(null);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching sold players:", err);
        setError(err.message || "Failed to load sold players data");
        toast.error("Failed to load top sold players");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldPlayers();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchSoldPlayers, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle image loading errors
  const handleImageError = (playerId) => {
    setImageErrors((prev) => ({ ...prev, [playerId]: true }));
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text.toString())
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  // Share player info
  const sharePlayer = (player) => {
    const text = `🏏 ${
      player.name
    } sold for ₹${player.currentBid?.toLocaleString()} to ${
      player.lastBiddingTeam
    } in MPL Auction!`;

    if (navigator.share) {
      navigator.share({
        title: "MPL Auction",
        text: text,
        url: window.location.href,
      });
    } else {
      copyToClipboard(text);
    }
  };

  // Get price badge class
  const getPriceClass = (price) => {
    if (price >= 3000) return styles.priceElite;
    if (price >= 2000) return styles.pricePremium;
    if (price >= 1000) return styles.priceStandard;
    return styles.priceBasic;
  };

  // Get rank badge class
  const getRankClass = (rank) => {
    switch (rank) {
      case 1:
        return styles.rankGold;
      case 2:
        return styles.rankSilver;
      case 3:
        return styles.rankBronze;
      default:
        return styles.rankNormal;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏆 Top Sold Players</h1>
          <p className={styles.subtitle}>Loading auction highlights...</p>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonAvatar}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLineShort}></div>
              </div>
              <div className={styles.skeletonPrice}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏆 Top Sold Players</h1>
          <p className={styles.subtitle}>Auction Highlights</p>
        </div>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Unable to Load Data</h3>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🏆 Top Sold Players</h1>
          <p className={styles.subtitle}>Highest bids in the current auction</p>
          <div className={styles.stats}>
            <span className={styles.stat}>
              Total: <strong>{players.length}</strong>
            </span>
            <span className={styles.stat}>
              Max Bid:{" "}
              <strong>
                ₹
                {Math.max(
                  ...players.map((p) => p.currentBid)
                )?.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className={styles.grid}>
        {players.map((player) => (
          <div
            key={player.id}
            className={`${styles.playerCard} ${getPriceClass(
              player.currentBid
            )}`}
            onClick={() => setSelectedPlayer(player)}
          >
            {/* Rank Badge */}
            <div className={`${styles.rankBadge} ${getRankClass(player.rank)}`}>
              #{player.rank}
            </div>

            {/* Player Avatar */}
            <div className={styles.avatarSection}>
              <div
                className={styles.avatarContainer}
                style={{
                  background:
                    player.profileImg && !imageErrors[player.id]
                      ? "transparent"
                      : `linear-gradient(135deg, ${player.gradient[0]}, ${player.gradient[1]})`,
                }}
              >
                {player.profileImg && !imageErrors[player.id] ? (
                  <img
                    src={player.profileImg}
                    alt={player.name}
                    className={styles.playerImage}
                    onError={() => handleImageError(player.id)}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.playerInitials}>
                    {getInitials(player.name)}
                  </span>
                )}
              </div>
              {player.rank === 1 && <div className={styles.crown}>👑</div>}
            </div>

            {/* Player Info */}
            <div className={styles.playerInfo}>
              <h3 className={styles.playerName} title={player.name}>
                {player.name}
              </h3>
              <div className={styles.playerMeta}>
                <span className={styles.playerPosition}>{player.position}</span>
                <span className={styles.playerAge}>{player.age} yrs</span>
              </div>
              <div className={styles.teamInfo}>
                <span className={styles.teamName}>
                  {player.lastBiddingTeam}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className={styles.priceSection}>
              <div className={styles.priceLabel}>SOLD FOR</div>
              <div className={styles.priceValue}>
                ₹{player.currentBid?.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {players.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🤔</div>
          <h3>No Players Sold Yet</h3>
          <p>Players will appear here once they are sold in the auction</p>
        </div>
      )}

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedPlayer(null)}
            >
              ×
            </button>

            <div className={styles.modalBody}>
              {/* Modal Avatar */}
              <div className={styles.modalAvatarSection}>
                <div
                  className={styles.modalAvatar}
                  style={{
                    background:
                      selectedPlayer.profileImg &&
                      !imageErrors[selectedPlayer.id]
                        ? "transparent"
                        : `linear-gradient(135deg, ${selectedPlayer.gradient[0]}, ${selectedPlayer.gradient[1]})`,
                  }}
                >
                  {selectedPlayer.profileImg &&
                  !imageErrors[selectedPlayer.id] ? (
                    <img
                      src={selectedPlayer.profileImg}
                      alt={selectedPlayer.name}
                      className={styles.modalImage}
                    />
                  ) : (
                    <span className={styles.modalInitials}>
                      {getInitials(selectedPlayer.name)}
                    </span>
                  )}
                </div>
                <div className={styles.modalRank}>
                  Rank #{selectedPlayer.rank}
                </div>
              </div>

              {/* Modal Info */}
              <div className={styles.modalInfo}>
                <h2 className={styles.modalName}>{selectedPlayer.name}</h2>

                <div className={styles.modalDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Position</span>
                    <span className={styles.detailValue}>
                      {selectedPlayer.position}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Age</span>
                    <span className={styles.detailValue}>
                      {selectedPlayer.age} years
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Team</span>
                    <span className={styles.detailValue}>
                      {selectedPlayer.lastBiddingTeam}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Sold Price</span>
                    <span className={styles.detailPrice}>
                      ₹{selectedPlayer.currentBid?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSoldOut;
