import React, { useState, useEffect } from "react";
import "./design/PointsTable.css";

export const PointsTable = () => {
  // Team data state
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Vishwanath Warriors",
      logo: "./images/logo2.jpeg",
      played: 3,
      won: 2,
      lost: 1,
      tied: 0,
      exp: "0",
      points: 6,
    },
    {
      id: 2,
      name: "Dipak Warriors",
      logo: "./images/logo3.jpg",
      played: 3,
      won: 2,
      lost: 1,
      tied: 0,
      exp: "0",
      points: 6,
    },
    {
      id: 3,
      name: "Black Panthers",
      logo: "./images/logo4.jpeg",
      played: 3,
      won: 0,
      lost: 3,
      tied: 0,
      exp: "0",
      points: 0,
    },
    {
      id: 4,
      name: "Shree Yodha",
      logo: "./images/logo5.jpeg",
      played: 3,
      won: 1,
      lost: 2,
      tied: 0,
      exp: "0",
      points: 3,
    },
    {
      id: 5,
      name: "Vishnu Blaster",
      logo: "../images/logo6.jpeg",
      played: 3,
      won: 2,
      lost: 1,
      tied: 0,
      exp: "0",
      points: 6,
    },
    {
      id: 6,
      name: "Jagan Super Strikers",
      logo: "./images/logo7.jpeg",
      played: 3,
      won: 2,
      lost: 1,
      tied: 0,
      exp: "0",
      points: 6,
    },
  ]);

  // Sort teams by points descending
  useEffect(() => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    setTeams(sortedTeams);
  }, [teams]);

  return (
    <div className="table_container">
      <h2>MPL Points Table</h2>
      <table className="points_table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Logo</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Tied</th>
            <th>EXP</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} alt="logos" />
              </td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.tied}</td>
              <td>{team.exp}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
