// src/components/LiveAuction.jsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import styles from "./design/LiveAuction.module.css";

// --- SOCKET SETUP ---
const SOCKET_URL = "https://mpl-backend-5gc6.onrender.com/";
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

// Bid milestone thresholds
const BID_MILESTONES = [1000, 2000, 3000];

// Fireworks Component
const Fireworks = () => {
  return (
    <div className={styles.fireworksContainer}>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className={styles.firework}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
};

// Confetti Component
const Confetti = () => {
  return (
    <div className={styles.confettiContainer}>
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className={styles.confetti}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Hammer Animation Component (auction hammer, centered on profile side)
const HammerAnimation = () => {
  return (
    <div className={styles.hammerContainer}>
      <div className={styles.hammer}>🔨</div>
    </div>
  );
};

// Milestone Celebration Overlay (for 1000+, 2000+, 3000+)
const MilestoneCelebration = ({ threshold, amount, level }) => {
  const levelClass =
    level === 1
      ? styles.milestoneLevel1
      : level === 2
      ? styles.milestoneLevel2
      : styles.milestoneLevel3;

  return (
    <div className={styles.milestoneOverlay}>
      <div className={`${styles.milestoneCard} ${levelClass}`}>
        <div className={styles.milestoneRing} />
        <div className={styles.milestoneInner}>
          <span className={styles.milestoneLabel}>BID MILESTONE</span>
          <h2 className={styles.milestoneTitle}>₹ {threshold}+ Crossed!</h2>
          <p className={styles.milestoneAmount}>Current Bid: ₹ {amount}</p>
          <p className={styles.milestoneSub}>The auction is heating up! 🔥</p>
        </div>
        <div className={styles.milestoneSpark1}>★</div>
        <div className={styles.milestoneSpark2}>★</div>
        <div className={styles.milestoneSpark3}>★</div>
      </div>
    </div>
  );
};

export const LiveAuction = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(200);
  const [lastBiddingTeam, setLastBiddingTeam] = useState("No bids yet");
  const [isBidFinalised, setIsBidFinalised] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // Milestone celebration state
  const [milestoneCelebration, setMilestoneCelebration] = useState(null);
  const milestoneIndexRef = useRef(-1); // which milestone index already celebrated (-1 = none)

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN").format(amount);

  // auto-hide milestone overlay after some seconds
  useEffect(() => {
    if (!milestoneCelebration) return;
    const t = setTimeout(() => setMilestoneCelebration(null), 3500);
    return () => clearTimeout(t);
  }, [milestoneCelebration]);

  useEffect(() => {
    const applyAuctionState = (data, { isFinalizedEvent = false } = {}) => {
      if (!data || !data.player) return;

      const newBid = data.currentBid ?? 200;

      setSelectedPlayer(data.player);
      setCurrentBid(newBid);
      setLastBiddingTeam(data.lastBiddingTeam || "No bids yet");
      setIsBidFinalised(!!data.isBidFinalised);

      // Milestone celebrations (only for live bidding, not finalization)
      if (!isFinalizedEvent && typeof newBid === "number") {
        for (let i = 0; i < BID_MILESTONES.length; i++) {
          const threshold = BID_MILESTONES[i];
          if (newBid >= threshold && milestoneIndexRef.current < i) {
            milestoneIndexRef.current = i;

            setMilestoneCelebration({
              level: i + 1,
              threshold,
              amount: newBid,
            });

            toast.info(`Bid crossed ₹${threshold}!`, {
              toastId: `milestone-${threshold}`,
            });
            break;
          }
        }
      }

      // Toast + fireworks ONLY when we receive "bidFinalized" event
      if (isFinalizedEvent) {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 6000);

        const message = `SOLD! ${data.player.name} to ${data.lastBiddingTeam} for ₹${data.currentBid}`;
        toast.success(message, {
          toastId: `sold-${data.player.id}-${data.currentBid}`,
        });
      }
    };

    const handleAuctionState = (data) => {
      // state sync without toast
      applyAuctionState(data);
    };

    const handlePlayerSelected = (data) => {
      // New player: reset milestones
      milestoneIndexRef.current = -1;
      setMilestoneCelebration(null);
      setShowFireworks(false);
      applyAuctionState({ ...data, isBidFinalised: false });
    };

    const handleBidUpdated = (data) => {
      applyAuctionState({ ...data, isBidFinalised: false });
    };

    const handleBidFinalized = (data) => {
      applyAuctionState(data, { isFinalizedEvent: true });
    };

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      socket.emit("getCurrentAuctionState");
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.on("auctionState", handleAuctionState);
    socket.on("playerSelected", handlePlayerSelected);
    socket.on("bidUpdated", handleBidUpdated);
    socket.on("bidFinalized", handleBidFinalized);

    if (socket.connected) {
      socket.emit("getCurrentAuctionState");
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("auctionState", handleAuctionState);
      socket.off("playerSelected", handlePlayerSelected);
      socket.off("bidUpdated", handleBidUpdated);
      socket.off("bidFinalized", handleBidFinalized);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Celebration Effects on Sold */}
      {showFireworks && <Fireworks />}
      {showFireworks && <Confetti />}
      {showFireworks && <HammerAnimation />}

      {/* Milestone overlays for 1000+/2000+/3000+ */}
      {milestoneCelebration && (
        <MilestoneCelebration
          threshold={milestoneCelebration.threshold}
          amount={milestoneCelebration.amount}
          level={milestoneCelebration.level}
        />
      )}

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>MPL LIVE AUCTION</h1>
        <div className={styles.liveBadge}>
          <div className={styles.liveDot}></div>
          Live
        </div>
      </div>

      {/* Content */}
      {selectedPlayer? (
        <div className={`${styles.card} ${isBidFinalised ? styles.sold : ""}`}>
          {/* LEFT: PLAYER BANNER */}
          <div className={styles.imageSection}>
            <div className={styles.playerBanner}>
              <div className={styles.bannerGraphic} />
              <div className={styles.bannerGraphicSecondary} />

              {isBidFinalised && <div className={styles.soldRibbon}>SOLD</div>}

              <div className={styles.bannerContent}>
                <div className={styles.bannerImageWrapper}>
                  <img
                    src={selectedPlayer.profileImg || "./images/default.jpeg"}
                    alt={selectedPlayer.name}
                    className={styles.playerImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400?text=No+Image";
                    }}
                  />
                </div>

                <div className={styles.bannerTextBlock}>
                  <span className={styles.bannerLabel}>Player</span>
                  {/* <span className={styles.bannerName}>
                    {selectedPlayer.name}
                  </span> */}
                  {/* <span className={styles.bannerSub}>LIVE IN MPL AUCTION</span> */}

                  {/* <div className={styles.bannerTeamBox}>
                    <span className={styles.bannerTeamLabel}>Team</span>
                    <span className={styles.bannerTeamValue}>
                      {lastBiddingTeam}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STATS & BID */}
          <div className={styles.infoSection}>
            <h2 className={styles.playerNameHeading}>{selectedPlayer.name}</h2>

            <div className={styles.playerMeta}>
              <span className={styles.metaTag}>
                <strong>Age:</strong> {selectedPlayer.age || "N/A"}
              </span>
              <span className={styles.metaTag}>
                <strong>Role:</strong>{" "}
                {selectedPlayer.position || "All Rounder"}
              </span>
            </div>

            <div className={styles.bidContainer}>
              <p className={styles.bidLabel}>
                {isBidFinalised ? "Sold Price" : "Current Bid"}
              </p>
              <h3 className={styles.bidPrice}>
                ₹ {formatCurrency(currentBid)}
              </h3>

              <div className={styles.lastBidder}>
                <p className={styles.bidLabel}>
                  {isBidFinalised ? "Winning Team" : "Highest Bidder"}
                </p>
                <div className={styles.teamName}>{lastBiddingTeam}</div>
              </div>
            </div>

            {isBidFinalised && (
              <div className={styles.soldSection}>
                <h3 className={styles.soldTitle}>SOLD OUT</h3>
                <p className={styles.congratsText}>
                  Congratulations to <strong>{selectedPlayer.name}</strong> for
                  joining {lastBiddingTeam}! 🥳
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.waitingState}>
          <span className={styles.waitingSpinner}>⏳</span>
          <h2>MPL Live Auction</h2>
          <p>Date : 04/12/2025 At 8PM</p>
        </div>
      )}
    </div>
  );
};
