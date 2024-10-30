import React, { useState } from "react";
import "./AdminDesign/AdminTeamPlayers.css";

export const AdminTeamPlayers = () => {
  const teams = [
    { id: 1, name: "Chennai Super Kings", logo: "./images/csk.png" },
    { id: 2, name: "Mumbai Indians", logo: "./images/mi.png" },
    { id: 3, name: "RCB", logo: "./images/rcb.webp" },

    // Additional teams here
  ];

  const allPlayers = [
    {
      id: 1,
      name: "Baban Ratilal Naik",
      age: 21,
      position: "All Rounder",
      teamId: 1,
      price: 1500,
    },
    {
      id: 2,
      name: "Pankaj Suklal Naik",
      age: 24,
      position: "Batsman",
      teamId: 2,
      price: 2000,
    },
    {
      id: 3,
      name: "Pankaj Suklal Naik",
      age: 24,
      position: "Batsman",
      teamId: 3,
      price: 2000,
    },
    // Additional players here
  ];

  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [players, setPlayers] = useState(allPlayers);

  const handleTeamSelect = (teamName) => setSelectedTeamName(teamName);

  const handleDeletePlayer = (playerId) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  const handlePrintTeam = () => {
    const selectedTeam = teams.find((team) => team.name === selectedTeamName);
    const teamPlayers = players.filter(
      (player) => player.teamId === selectedTeam.id
    );

    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>${selectedTeamName} Players Details</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border: 1px solid #ddd; }
            th { background-color: #3498db; color: white; }
            .author { position: absolute; bottom: 10px; right: 10px; font-size: 15px; color: #666; }
            .sold {color: green; }
          </style>
        </head>
        <body>
          <h2>${selectedTeamName} Players</h2>
          <img src="${
            selectedTeam.logo
          }" alt="${selectedTeamName} logo" style="width: 80px; height: 80px; margin: 10px auto; display: block;" />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Sold Price (₹)</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              ${teamPlayers
                .map(
                  (player) => `
                  <tr>
                    <td>${player.id}</td>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${player.age}</td>
                    <td>${player.price}</td>
                    <td class="sold">Sold</td>
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
    newWindow.print();
  };

  return (
    <div className="admin-team-players-container">
      <h1 className="admin-header">Admin Team Players Management</h1>
      <div className="admin-teams-and-players">
        {/* Team List */}
        <div className="admin-teams-list">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`admin-team-card ${
                selectedTeamName === team.name ? "admin-team-card-selected" : ""
              }`}
              onClick={() => handleTeamSelect(team.name)}
            >
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="admin-team-logo"
              />
              <p className="admin-team-name">{team.name}</p>
            </div>
          ))}
        </div>

        {/* Team Players Table */}
        {selectedTeamName && (
          <div className="admin-team-players-table-container">
            <h2>{selectedTeamName}</h2>
            <img
              src={teams.find((team) => team.name === selectedTeamName).logo}
              alt={`${selectedTeamName} logo`}
              className="team-logo"
              style={{
                width: "80px",
                height: "80px",
                margin: "10px auto",
                display: "block",
              }}
            />
            <table className="admin-team-players-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Age</th>
                  <th>Price (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .filter(
                    (player) =>
                      teams.find((team) => team.name === selectedTeamName)
                        ?.id === player.teamId
                  )
                  .map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>{player.name}</td>
                      <td>{player.position}</td>
                      <td>{player.age}</td>
                      <td>{player.price}</td>
                      <td className="sold-out">Sold</td>
                      <td>
                        <button
                          onClick={() => handleDeletePlayer(player.id)}
                          className="admin-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Print Button for Selected Team */}
            <button
              onClick={handlePrintTeam}
              className="admin-print-button"
              style={{ marginTop: "20px" }}
            >
              Print {selectedTeamName} Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
