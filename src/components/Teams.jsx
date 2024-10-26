import React, { useState } from "react";
import "./design/Teams.css";

export const Teams = () => {
  const teams = [
    {
  id: 1,
  mpl: "Malkheda Premier League",
  name: "Royal Challengers Bangalore",
  owner: "United Spirits Limited",
  logo: "./images/rcb.webp",
  players: [
    { id: 1, name: "Virat Kohli", role: "Batsman", price: "₹5000" },
    { id: 2, name: "Mohammed Siraj", role: "Bowler", price: "₹4700" },
    { id: 3, name: "Faf du Plessis", role: "Batsman", price: "₹4800" },
    { id: 4, name: "Glenn Maxwell", role: "All-rounder", price: "₹4500" },
    { id: 5, name: "Harshal Patel", role: "Bowler", price: "₹4200" },
    { id: 6, name: "Dinesh Karthik", role: "Wicketkeeper-Batsman", price: "₹4000" },
    { id: 7, name: "Wanindu Hasaranga", role: "All-rounder", price: "₹4300" },
    { id: 8, name: "Shahbaz Ahmed", role: "All-rounder", price: "₹3900" },
    { id: 9, name: "Josh Hazlewood", role: "Bowler", price: "₹4600" },
    { id: 10, name: "Anuj Rawat", role: "Wicketkeeper-Batsman", price: "₹3800" },
    { id: 11, name: "Karn Sharma", role: "Bowler", price: "₹3700" },
    { id: 12, name: "Suyash Prabhudessai", role: "All-rounder", price: "₹3500" },
    { id: 13, name: "Akash Deep", role: "Bowler", price: "₹3400" },
    { id: 14, name: "Finn Allen", role: "Batsman", price: "₹4000" },
    { id: 15, name: "David Willey", role: "All-rounder", price: "₹3600" },
    { id: 16, name: "Mahipal Lomror", role: "All-rounder", price: "₹3300" },
    { id: 17, name: "Rajat Patidar", role: "Batsman", price: "₹4100" },
    { id: 18, name: "Reece Topley", role: "Bowler", price: "₹4400" },
    { id: 19, name: "Manoj Bhandage", role: "All-rounder", price: "₹3200" },
    { id: 20, name: "Himanshu Sharma", role: "Bowler", price: "₹3100" },
  ],
},
    {
      id: 2,
      mpl: "Malkheda Primer League",
      name: "Mumbai Indians",
      owner: "Mukesh Ambani",
      logo: "./images/mi.png",
      players: [
        { id: 1, name: "Rohit Sharma", role: "Batsman", price: "₹4000" },
        { id: 2, name: "Jasprit Bumrah", role: "Bowler", price: "₹4500" },
      ],
    },
    {
      id: 3,
      mpl: "Malkheda Primer League",
      name: "Chennai Super Kings",
      owner: "N. Srinivasan",
      logo: "./images/csk.png",
      players: [
        { id: 1, name: "MS Dhoni", role: "Wicketkeeper", price: "₹2000" },
        { id: 2, name: "Ravindra Jadeja", role: "All-rounder", price: "₹3000" },
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
        <h1>MPL</h1> <!-- MPL Title -->
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
            <h2 className="participating-team-title">Participating Teams In MPL</h2>

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
                    {/* Print Button */}
                    <button
                      className="print-btn"
                      onClick={() => handlePrint(team.id)}
                    >
                      Print Details
                    </button>
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