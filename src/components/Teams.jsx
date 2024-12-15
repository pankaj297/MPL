import React, { useState, useEffect } from "react";
import "./design/Teams.css";

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Teams data (can be fetched if dynamic, but this is hardcoded for now)
  const teamData = [
    {
      id: 1,
      mpl: "Malkheda Primer League",
      name: "Vishwanath Warriors",
      owner: "Vishwanath Chavan",
      logo: "./images/logo2.jpeg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000, // Total budget for the team
    },
    {
      id: 2,
      mpl: "Malkheda Primer League",
      name: "Dipak Warriors",
      owner: "Dipak Ashok Naik",
      logo: "./images/logo3.jpg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000,
    },
    {
      id: 3,
      mpl: "Malkheda Primer League",
      name: "Black Panthers",
      owner: "Ankush Ramlal Rathod",
      logo: "./images/logo4.jpeg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000,
    },
    {
      id: 4,
      mpl: "Malkheda Primer League",
      name: "Shree Yodha",
      owner: "Sachin Indrajit Pawar",
      logo: "./images/logo5.jpeg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000,
    },
    {
      id: 5,
      mpl: "Malkheda Primer League",
      name: "Vishnu Blaster",
      owner: "Vishnu Kailash Rathod",
      logo: "./images/logo6.jpeg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000,
    },
    {
      id: 6,
      mpl: "Malkheda Primer League",
      name: "Jagan Super Strikers",
      owner: "Jagan Yuvraj Rathod",
      logo: "./images/logo7.jpeg",
      profile: "./images/O1.jpeg",
      totalPurse: 7000,
    },
  ];

  // Fetch player data from the API
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(
          "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
        );
        const data = await response.json();

        // Update teams with player data
        const updatedTeams = teamData.map((team) => {
          // Find players who belong to the current team based on lastBiddingTeam
          const teamPlayers = data.filter(
            (player) =>
              player.lastBiddingTeam?.trim().toLowerCase() ===
              team.name.trim().toLowerCase()
          );

          // Calculate remaining purse
          const totalSpent = teamPlayers.reduce(
            (sum, player) => sum + player.currentBid,
            0
          );

          return {
            ...team,
            players: teamPlayers.map((player, index) => ({
              id: index + 1,
              name: player.name,
              role: player.position,
              price: player.currentBid,
              age: player.age,
              position: player.position,
              currentBid: player.currentBid,
              lastBiddingTeam: player.lastBiddingTeam,
            })),
            remainingPurse: team.totalPurse - totalSpent,
          };
        });

        setTeams(updatedTeams);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, []);

  const handleShowTeamDetails = (teamId) => {
    setSelectedTeamId((prevId) => (prevId === teamId ? null : teamId));
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
            .author { right: 10px; font-weight: bold; font-size: 15px; color: #666; }
          </style>
        </head>
        <body>
          <h2>${team.mpl}</h2>
          <img src="${team.logo}" alt="${team.name} Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; border: 3px solid #3498db;"/>
          <div>${printContent.innerHTML}</div>
          <div class="author">Author: Pankaj Naik</div>
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
                    <img
                      src={team.profile}
                      alt={`${team.name} Logo`}
                      className="team-logo2"
                    />
                    <div className="team-info">
                      <h3>{team.name}</h3>
                      <p>Owner: {team.owner}</p>
                      <p>Remaining Purse: ₹{team.remainingPurse}</p>
                    </div>

                    <a
                      className="teams-btn"
                      onClick={() => handleShowTeamDetails(team.id)}
                    >
                      {selectedTeamId === team.id
                        ? "Hide Details"
                        : "Show Details"}
                    </a>
                    <a
                      className="teams-btn"
                      onClick={() => handlePrint(team.id)}
                    >
                      Print Details
                    </a>
                  </div>
                  <div className="table-content" id={`team-${team.id}`}>
                    {selectedTeamId === team.id && (
                      <div className="team-details">
                        <h2>{team.name} Players</h2>
                        <table className="players-table">
                          <thead>
                            <tr>
                              <th>Sr No</th>
                              <th>Player Name</th>
                              <th>Role</th>
                              <th>Age</th>
                              <th>Position</th>
                              <th>Sold Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {team.players.map((player, index) => (
                              <tr key={index}>
                                <td>{player.id}</td>
                                <td>{player.name}</td>
                                <td>{player.role}</td>
                                <td>{player.age}</td>
                                <td>{player.position}</td>
                                <td className="sold-price">
                                  ₹{player.currentBid}
                                </td>
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

//! ===============================================

// import React, { useState, useEffect } from "react";
// import "./design/Teams.css";

// export const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [selectedTeamId, setSelectedTeamId] = useState(null);

//   // Teams data (can be fetched if dynamic, but this is hardcoded for now)
//   const teamData = [
//     {
//       id: 1,
//       mpl: "Malkheda Primer League",
//       name: "Vishwanath warriors",
//       owner: "Vishwanath Chavan",
//       logo: "./images/logo2.jpeg",
//     },
//     {
//       id: 2,
//       mpl: "Malkheda Primer League",
//       name: "Dipak Warriors",
//       owner: "Dipak Ashok Naik",
//       logo: "./images/logo3.jpg",
//     },
//     {
//       id: 3,
//       mpl: "Malkheda Primer League",
//       name: "Black Panthers",
//       owner: "Ankush Ramlal Rathod",
//       logo: "./images/logo4.jpeg",
//     },
//     {
//       id: 4,
//       mpl: "Malkheda Primer League",
//       name: "Shree Yodha",
//       owner: "Sachin Indrajit Pawar",
//       logo: "./images/logo5.jpeg",
//     },
//     {
//       id: 5,
//       mpl: "Malkheda Primer League",
//       name: "Vishnu Blaster",
//       owner: "Vishnu Kailash Rathod",
//       logo: "./images/logo6.jpeg",
//     },
//     {
//       id: 6,
//       mpl: "Malkheda Primer League",
//       name: "Jagan Super Strikers",
//       owner: "Jagan Yuvraj Rathod",
//       logo: "./images/logo7.jpeg",
//     },
//   ];

//   // Fetch player data from the API
//   useEffect(() => {
//     const fetchPlayerData = async () => {
//       try {
//         const response = await fetch(
//           "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
//         );
//         const data = await response.json();

//         // Update teams with player data
//         const updatedTeams = teamData.map((team) => {
//           // Find players who belong to the current team based on lastBiddingTeam
//           const teamPlayers = data.filter(
//             (player) => player.lastBiddingTeam === team.name
//           );

//           return {
//             ...team,
//             players: teamPlayers.map((player, index) => ({
//               id: index + 1,
//               name: player.name,
//               role: player.position,
//               price: player.currentBid,
//               age: player.age,
//               position: player.position,
//               currentBid: player.currentBid,
//               lastBiddingTeam: player.lastBiddingTeam,
//             })),
//           };
//         });

//         setTeams(updatedTeams);
//       } catch (error) {
//         console.error("Error fetching player data:", error);
//       }
//     };

//     fetchPlayerData();
//   }, []);

//   const handleShowTeamDetails = (teamId) => {
//     if (selectedTeamId === teamId) {
//       setSelectedTeamId(null);
//     } else {
//       setSelectedTeamId(teamId);
//     }
//   };

//   const handlePrint = (teamId) => {
//     const printContent = document.getElementById(`team-${teamId}`);
//     const team = teams.find((team) => team.id === teamId);

//     const newWindow = window.open("", "", "width=600,height=600");
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>${team.name} Details</title>
//           <style>
//             body { font-family: Arial, sans-serif; position: relative; min-height: 100vh; margin: 0; padding-bottom: 40px; box-sizing: border-box; }
//             h1, h2 { text-align: center; }
//             img { display: block; margin: 0 auto; }
//             table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//             th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
//             th { background-color: #3498db; color: white; }
//             .author { right: 10px; font-weight: bold; font-size: 15px; color: #666; }
//           </style>
//         </head>
//         <body>
//           <h2>${team.mpl}</h2>
//           <img src="${team.logo}" alt="${team.name} Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; border: 3px solid #3498db;"/>
//           <div>${printContent.innerHTML}</div>
//           <div class="author">Author: Pankaj Naik</div>
//         </body>
//       </html>
//     `);
//     newWindow.document.close();
//     newWindow.print();
//   };

//   return (
//     <>
//       <div className="mpl-teams-page">
//         <div className="participating-teams">
//           <div className="teams-container">
//             <h2 className="participating-team-title">
//               Participating Teams In MPL
//             </h2>
//             <div className="team-list">
//               {teams.map((team) => (
//                 <div key={team.id} className="team-profile">
//                   <div className="profile-content">
//                     <img
//                       src={team.logo}
//                       alt={`${team.name} Logo`}
//                       className="team-logo"
//                     />
//                     <div className="team-info">
//                       <h3>{team.name}</h3>
//                       <p>Owner: {team.owner}</p>
//                     </div>
//                     <a
//                       className="teams-btn"
//                       onClick={() => handleShowTeamDetails(team.id)}
//                     >
//                       {selectedTeamId === team.id
//                         ? "Hide Details"
//                         : "Show Details"}
//                     </a>
//                     <a
//                       className="teams-btn"
//                       onClick={() => handlePrint(team.id)}
//                     >
//                       Print Details
//                     </a>
//                   </div>
//                   <div className="table-content" id={`team-${team.id}`}>
//                     {selectedTeamId === team.id && (
//                       <div className="team-details">
//                         <h2>{team.name} Players</h2>
//                         <table className="players-table">
//                           <thead>
//                             <tr>
//                               <th>Sir No</th>
//                               <th>Player Name</th>
//                               <th>Role</th>
//                               <th>Age</th>
//                               <th>Position</th>
//                               <th>Sold Price</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {team.players.map((player, index) => (
//                               <tr key={index}>
//                                 <td>{player.id}</td>
//                                 <td>{player.name}</td>
//                                 <td>{player.position}</td>
//                                 <td>{player.age}</td>
//                                 <td>{player.position}</td>
//                                 <td className="sold-price">₹{player.currentBid}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ====================================================
