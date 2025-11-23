import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDesign/TotalSoldOutPlayers.module.css";

export const TotalSoldOutPlayers = () => {
  const [soldOutPlayers, setSoldOutPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSoldOutPlayers();
  }, []);

  const fetchSoldOutPlayers = async () => {
    try {
      const response = await axios.get(
        "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
      );
      setSoldOutPlayers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load players");
      setLoading(false);
    }
  };

  const handlePrintTable = () => {
    const newWindow = window.open("", "", "width=800,height=800");
    newWindow.document.write(`
      <html>
        <head>
          <title>MPL Sold Out Players</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border: 1px solid #ddd; }
            th { background-color: #3498db; color: white; }
            .status { color: green; font-weight: bold; }
            .author {
              position: fixed;
              bottom: 0;
              right: 0;
              font-size: 15px;
              color: #666;
              width: 100%;
              text-align: center;
              background: white;
              padding: 5px 0;
            }
            @media print {
              .author {
                position: fixed;
                bottom: 0;
                right: 0;
                width: 100%;
                text-align: center;
                background: white;
                padding: 5px 0;
              }
            }
          </style>
        </head>
        <body>
          <h2>MPL Total Sold Out Players</h2>
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Sold Out Price (₹)</th>
                <th>Selected Team</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${soldOutPlayers
                .map(
                  (player, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                    <td>${player.position}</td>
                    <td>${player.currentBid}</td>
                    <td>${player.lastBiddingTeam}</td>
                    <td class="status">Sold</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
          <div class="author">Author: Pankaj Naik</div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.onload = () => {
      newWindow.print();
    };
  };

  const handleDeletePlayer = async (playerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sold-out player record?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(
        `https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/deletefinalisedbidding/${playerId}`
      );
      setSoldOutPlayers((prev) =>
        prev.filter((player) => player._id !== playerId)
      );
      alert("Player deleted successfully.");
    } catch (err) {
      alert("Error deleting player: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <p className={styles.infoText}>Loading...</p>;
  if (error) return <p className={styles.infoText}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>MPL Total Sold Out Players</h1>
        <button onClick={handlePrintTable} className={styles.printButton}>
          Print Sold Out Players
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Sold Out Price (₹)</th>
              <th>Selected Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {soldOutPlayers.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.position}</td>
                <td>{player.currentBid}</td>
                <td>{player.lastBiddingTeam}</td>
                <td className={styles.statusText}>Sold</td>
                <td>
                  <button
                    onClick={() => handleDeletePlayer(player._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {soldOutPlayers.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.emptyRow}>
                  No sold-out players found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
