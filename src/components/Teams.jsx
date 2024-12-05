import React, { useState } from "react";
import "./design/Teams.css";

export const Teams = () => {
  const teams = [
    {
      id: 1,
      mpl: "Malkheda Primer League",
      name: "Vishwanath warriors",
      owner: "Vishwanath Rathod",
      logo: "./images/logo2.jpeg",
      players: [
        { id: 1, name: "Akash Ramesh Naik", role: "_", price: "₹1000" },
        { id: 2, name: "Pavan Saidas Chavan", role: "_", price: "₹1000" },
      ],
    },
    {
      id: 2,
      mpl: "Malkheda Primer League",
      name: "Dipak Warriors",
      owner: "Dipak Ashok Naik",
      logo: "./images/logo3.jpg",
      players: [
        { id: 1, name: "Baban Ratilal Naik", role: "_", price: "₹1000" },
        { id: 2, name: "Yogesh Gotu Chavan", role: "_", price: "₹1000" },
      ],
    },
    {
      id: 3,
      mpl: "Malkheda Primer League",
      name: "Black Panthers",
      owner: "Ankush Ramlal Rathod",
      logo: "./images/logo4.jpeg",
      players: [
        { id: 1, name: "Rohit Ramkrushna Rathod", role: "_", price: "₹1000" },
        { id: 2, name: "Umesh Arjun Rathod", role: "_", price: "₹1000" },
      ],
    },

    {
      id: 4,
      mpl: "Malkheda Primer League",
      name: "Shree Yodha",
      owner: "Sachin Indrajit Pawar",
      logo: "./images/logo5.jpeg",
      players: [
        { id: 1, name: "Amol Dalichant Rathod", role: "_", price: "₹1000" },
        { id: 2, name: "Avinash Santhosh Chavan", role: "_", price: "₹1000" },
      ],
    },

    {
      id: 5,
      mpl: "Malkheda Primer League",
      name: "Vishnu Blaster",
      owner: "Vishnu Kailash Rathod",
      logo: "./images/logo6.jpeg",
      players: [
        { id: 1, name: "Himmat Jagan Naik", role: "_", price: "₹1000" },
        { id: 2, name: "Krushna Vijay Naik", role: "_", price: "₹1000" },
      ],
    },

    {
      id: 6,
      mpl: "Malkheda Primer League",
      name: "Jagan Super Strikers",
      owner: "Jagan Yuvraj Rathod",
      logo: "./images/logo7.jpeg",
      players: [
        { id: 1, name: "Dipak Anna Rathod", role: "_", price: "₹1000" },
        { id: 2, name: "Nitin ganesh Rathod", role: "_", price: "₹1000" },
      ],
    },

    // Add more teams in the same format (8 teams in total)
  ];

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleShowTeamDetails = (teamId) => {
    if (selectedTeamId === teamId) {
      setSelectedTeamId(null);
    } else {
      setSelectedTeamId(teamId);
    }
  };

  const handlePrint = (teamId) => {
    const printContent = document.getElementById(`team-${teamId}`);
    const team = teams.find((team) => team.id === teamId);

    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`
    <html>
      <head>
        <title>${team.name} Details</title>
        <style>
          body { font-family: Arial, sans-serif; position: relative; min-height: 100vh; margin: 0; padding-bottom: 40px; box-sizing: border-box; }
          h1, h2 { text-align: center; }
          img { display: block; margin: 0 auto; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #3498db; color: white; }
          .author { position: absolute; bottom: 10px; right: 10px; font-weight: bold;  font-size: 15px; color: #666; }
        </style>
      </head>
      <body>
        <h2>${team.mpl}</h2>
        <img src="${team.logo}" alt="${team.name} Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; border: 3px solid #3498db;"/>
        <div>${printContent.innerHTML}</div>
        <div class="author">Author: Pankaj Naik</div> <!-- Author at bottom right -->
      </body>
    </html>
  `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <>
      <div className="mpl-teams-page">
        <div className="participating-teams">
          <div className="teams-container">
            <h2 className="participating-team-title">
              Participating Teams In MPL
            </h2>

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
                    <a
                      className="teams-btn"
                      onClick={() => handleShowTeamDetails(team.id)}
                    >
                      {selectedTeamId === team.id
                        ? "Hide Details"
                        : "Show Details"}
                    </a>
                    {/* Print Button */}
                    <a
                      className="teams-btn"
                      onClick={() => handlePrint(team.id)}
                    >
                      Print Details
                    </a>
                  </div>
                  <div className="table-content" id={`team-${team.id}`}>
                    {/* Display player details if this team's ID matches the selected team */}
                    {selectedTeamId === team.id && (
                      <div className="team-details">
                        <h2>{team.name} Players</h2>
                        <table className="players-table">
                          <thead>
                            <tr>
                              <th>Sir No</th>
                              <th>Player Name</th>
                              <th>Role</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {team.players.map((player, index) => (
                              <tr key={index}>
                                <td>{player.id}</td>
                                <td>{player.name}</td>
                                <td>{player.role}</td>
                                <td>{player.price}</td>
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
      </div>
    </>
  );
};

//  <h2>${teams.find((team) => team.id === teamId).name} Players</h2>;
