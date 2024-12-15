import React, { useState, useEffect } from "react";
import "./design/PointsTable.css";

export const PointsTable = () => {
  // Team data state
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Vishwanath Warriors",
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
      name: "Dipak Warriors",
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
      name: "Black Panthers",
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
      name: "Shree Yodha",
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
      name: "Vishnu Blaster",
      played: 6,
      won: 1,
      lost: 4,
      tied: 1,
      noResult: 0,
      exp: "1.5",
      points: 8,
    },
    {
      id: 6,
      name: "Jagan Super Strikers",
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
            <th>Team Name</th>
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
              <td>{team.name}</td>
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
