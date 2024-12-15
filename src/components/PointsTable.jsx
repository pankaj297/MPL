import React, { useState, useEffect } from "react";
import "./design/PointsTable.css";

export const PointsTable = () => {
  // Team data state
  const [teams, setTeams] = useState([
    {
      id: 1,
      res: "Semi Finalist",
      name: "Vishwanath Warriors",
      logo: "./images/logo2.jpeg",
      played: 6,
      won: 4,
      lost: 2,
      tied: 0,
      noResult: 0,
      exp: "0.5",
      points: 8,
    },
    {
      id: 2,
      res: "Runners Up",
      name: "Dipak Warriors",
      logo: "./images/logo3.jpg",
      played: 6,
      won: 4,
      lost: 1,
      tied: 1,
      noResult: 0,
      exp: "0",
      points: 9,
    },
    {
      id: 3,
      res: "Final Winners",
      name: "Black Panthers",
      logo: "./images/logo4.jpeg",
      played: 6,
      won: 3,
      lost: 2,
      tied: 0,
      noResult: 1,
      exp: "0.5",
      points: 12.5,
    },
    {
      id: 4,
      res: "League stage",
      name: "Shree Yodha",
      logo: "./images/logo5.jpeg",
      played: 6,
      won: 2,
      lost: 4,
      tied: 0,
      noResult: 0,
      exp: "0",
      points: 4,
    },
    {
      id: 5,
      res: "Semi Finalist",
      name: "Vishnu Blaster",
      logo: "../images/logo6.jpeg",
      played: 6,
      won: 1,
      lost: 4,
      tied: 1,
      noResult: 0,
      exp: "1.5",
      points: 9,
    },
    {
      id: 6,
      res: "League stage",
      name: "Jagan Super Strikers",
      logo: "./images/logo7.jpeg",
      played: 6,
      won: 0,
      lost: 6,
      tied: 0,
      noResult: 0,
      exp: "0.5",
      points: 5,
    },
  ]);

  // Sort teams by points descending
  useEffect(() => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    setTeams(sortedTeams);
  }, [teams]);

  return (
    <div className="table_container">
      <h1>Demo MPL Points Table</h1>
      <table className="points_table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Last Years Results</th>
            <th>Team Name</th>
            <th>Logo</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Tied</th>
            <th>No Result</th>
            <th>EXP</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.res}</td>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} alt="logos" />
              </td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.tied}</td>
              <td>{team.noResult}</td>
              <td>{team.exp}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
