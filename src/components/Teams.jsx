import React, { useState, useEffect } from "react";
import styles from "./design/Teams.module.css"; // Importing the CSS Module

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Teams metadata
  const teamData = [
    {
      id: 1,
      mpl: "Malkheda Primer League",
      name: "Vishwanath Warriors",
      owner: "Ganesh Chavan",
      logo: "./images/logo2.jpeg",
      profile: "./images/001.jpeg",
      totalPurse: 8000,
    },
    {
      id: 2,
      mpl: "Malkheda Primer League",
      name: "Dipak Warriors",
      owner: "Dipak Ashok Naik",
      logo: "./images/logo3.jpg",
      profile: "./images/O2.jpeg",
      totalPurse: 8000,
    },
    {
      id: 3,
      mpl: "Malkheda Primer League",
      name: "Jijau Fighter",
      owner: "Samadhan Naik  ",
      logo: "./images/logoJijau.jpeg",
      profile: "./images/07.jpeg",
      totalPurse: 8000,
    },
    {
      id: 4,
      mpl: "Malkheda Primer League",
      name: "Mata Nagar",
      owner: "Kiran Pawar",
      logo: "./images/logo8.jpeg",
      profile: "./images/08.jpeg",
      totalPurse: 8000,
    },
    {
      id: 5,
      mpl: "Malkheda Primer League",
      name: "Vishnu Blaster",
      owner: "Vishnu Kailash Rathod",
      logo: "./images/logo6.jpeg",
      profile: "./images/O5.jpeg",
      totalPurse: 8000,
    },
    {
      id: 6,
      mpl: "Malkheda Primer League",
      name: "Ram Rajya Pratishthan",
      owner: "Umesh Rathod",
      logo: "./images/logo4.png",
      profile: "./images/04.jpeg",
      totalPurse: 8000,
    },
  ];

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
        );
        const data = await response.json();

        const updatedTeams = teamData.map((team) => {
          const teamPlayers = data.filter(
            (player) =>
              player.lastBiddingTeam?.trim().toLowerCase() ===
              team.name.trim().toLowerCase()
          );

          const totalSpent = teamPlayers.reduce(
            (sum, player) => sum + player.currentBid,
            0
          );

          return {
            ...team,
            players: teamPlayers.map((player, index) => ({
              id: index + 1,
              name: player.name,
              role: player.position || "All Rounder", // Default if missing
              age: player.age || "N/A",
              price: player.currentBid,
            })),
            remainingPurse: team.totalPurse - totalSpent,
            squadSize: teamPlayers.length,
          };
        });

        setTeams(updatedTeams);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  const handleToggleDetails = (teamId) => {
    setSelectedTeamId((prevId) => (prevId === teamId ? null : teamId));
  };

  // Modernized Print Function
  const handlePrint = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;

    const newWindow = window.open("", "", "width=800,height=800");

    // We inject inline styles into the print window to ensure it looks good
    // without relying on the external CSS file which might not load fast enough in print view
    newWindow.document.write(`
      <html>
        <head>
          <title>${team.name} - Squad List</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 3px solid #3498db; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #333; }
            h1 { margin: 10px 0 5px;  font-size: 24px; text-transform: uppercase; }
            h2 { margin: 0; font-size: 14px; color: #666; }
            .meta { display: flex; justify-content: space-between; margin-bottom: 20px; background: #f4f4f4; padding: 15px; border-radius: 8px; }
            .meta-item strong { display: block; font-size: 12px; color: #666; text-transform: uppercase; }
            .meta-item span { font-size: 16px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; font-size: 14px; }
            th { background-color: #3498db; color: white; padding: 12px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .total-row { font-weight: bold; background-color: #eee; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; border-top: 1px  solid #ddd;  padding-top: 3px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${team.logo}" class="logo" alt="Logo" />
            <h1>${team.name}</h1>
            <h2>${team.mpl} - Owner: ${team.owner}</h2>
          </div>

          <div class="meta">
            <div class="meta-item"><strong>Total Purse</strong><span>₹${
              team.totalPurse
            }</span></div>
            <div class="meta-item"><strong>Spent</strong><span>₹${
              team.totalPurse - team.remainingPurse
            }</span></div>
            <div class="meta-item"><strong>Remaining</strong><span>₹${
              team.remainingPurse
            }</span></div>
            <div class="meta-item"><strong>Squad Size</strong><span>${
              team.players.length
            }</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player Name</th>
                <th>Role</th>
                <th>Age</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${team.players
                .map(
                  (p) => `
                <tr>
                  <td>${p.id}</td>
                  <td>${p.name}</td>
                  <td>${p.role}</td>
                  <td>${p.age}</td>
                  <td>₹${p.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="footer">Generated by MPL Official Portal</div>
        </body>
      </html>
      
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Participating Teams</h2>
        <p className={styles.subtitle}>
          Malkheda Premier League Auction Status
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>Loading Teams Data...</div>
      ) : (
        <div className={styles.teamsGrid}>
          {teams.map((team) => (
            <div key={team.id} className={styles.teamCard}>
              {/* Top Section: Logos */}
              <div className={styles.cardHeader}>
                <div className={styles.logoContainer}>
                  <img
                    src={team.logo}
                    alt="Team Logo"
                    className={styles.teamLogo}
                  />
                  <span className={styles.imageLabel}>Team</span>
                </div>
                <div className={styles.logoContainer}>
                  <img
                    src={team.profile}
                    alt="Owner"
                    className={styles.ownerImage}
                  />
                  <span className={styles.imageLabel}>Owner</span>
                </div>
              </div>

              {/* Middle Section: Info */}
              <div className={styles.cardBody}>
                <h3 className={styles.teamName}>{team.name}</h3>
                <div className={styles.ownerName}>Owner: {team.owner}</div>

                <div className={styles.statsContainer}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Squad</span>
                    <span className={styles.statValue}>{team.squadSize}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Purse</span>
                    <span className={`${styles.statValue} ${styles.highlight}`}>
                      ₹{team.totalPurse}
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Remaining</span>
                    <span className={`${styles.statValue} ${styles.highlight}`}>
                      ₹{team.remainingPurse}
                    </span>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => handleToggleDetails(team.id)}
                  >
                    {selectedTeamId === team.id ? "Close Squad" : "View Squad"}
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnOutline}`}
                    onClick={() => handlePrint(team.id)}
                  >
                    Print
                  </button>
                </div>
              </div>

              {/* Bottom Section: Collapsible Table */}
              {selectedTeamId === team.id && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>Squad List</h4>
                  <div className={styles.tableWrapper}>
                    {team.players.length > 0 ? (
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.players.map((player) => (
                            <tr key={player.id}>
                              <td>{player.id}</td>
                              <td>{player.name}</td>
                              <td>
                                <span className={styles.roleBadge}>
                                  {player.role}
                                </span>
                              </td>
                              <td className={styles.priceTag}>
                                ₹{player.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ textAlign: "center", color: "#94a3b8" }}>
                        No players purchased yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
