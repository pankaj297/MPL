import React, { useState } from "react";
import "./design/Teams.css";


export const Teams = () => {
    const teams = [
      {
        id: 1,
        name: "Royal Challengers Bangalore",
        owner: "United Spirits Limited",
        logo: "./images/rcb.webp",
        players: [
          { name: "Virat Kohli", role: "Batsman" },
          { name: "Momad Siraj", role: "Bowler" },
        ],
      },
      {
        id: 2,
        name: "Mumbai Indians",
        owner: "Mukesh Ambani",
        logo: "./images/mi.png",
        players: [
          { name: "Rohit Sharma", role: "Batsman" },
          { name: "Jasprit Bumrah", role: "Bowler" },
        ],
      },
      {
        id: 3,
        name: "Chennai Super Kings",
        owner: "N. Srinivasan",
        logo: "./images/csk.png",
        players: [
          { name: "MS Dhoni", role: "Wicketkeeper" },
          { name: "Ravindra Jadeja", role: "All-rounder" },
        ],
      },
      // Add more teams in the same format (8 teams in total)
    ];

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleShowTeamDetails = (teamId) => {
    if (selectedTeamId === teamId) {
      setSelectedTeamId(null); // Hide details if the same team is clicked again
    } else {
      setSelectedTeamId(teamId); // Show details for the clicked team
    }
  };

  return (
    <>
      <div className="participating-teams">
        <div className="teams-container">
          <h2>Participating Teams In MPL</h2>

          <div className="team-list">
            {teams.map((team) => (
              <div key={team.id} className="team-profile">
                <div className="profile-content">
                  <img
                    src={team.logo}
                    alt={`${team.name} Logo`}
                    className="team-logo"
                  />
                  <div className="team-info">
                    <h3>{team.name}</h3>
                    <p>Owner: {team.owner}</p>
                  </div>
                  <button
                    className="team-details-btn"
                    onClick={() => handleShowTeamDetails(team.id)}
                  >
                    {selectedTeamId === team.id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </div>
                <div className="table-content">
                  {/* Display player details if this team's ID matches the selected team */}
                  {selectedTeamId === team.id && (
                    <div className="team-details">
                      <h2>{team.name} Players</h2>
                      <table className="players-table">
                        <thead>
                          <tr>
                            <th>Player Name</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.players.map((player, index) => (
                            <tr key={index}>
                              <td>{player.name}</td>
                              <td>{player.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
