// src/components/PointsTable.jsx
import React, { useState, useMemo } from "react";
import styles from "./design/PointsTable.module.css";

export const PointsTable = () => {
  const [teams] = useState([
    {
      id: 1,
      name: "Vishwanath Warriors",
      logo: "./images/logo2.jpeg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0, // can be 0 or you can remove this field, we auto-calc
    },
    {
      id: 2,
      name: "Vishnu Blaster",
      logo: "./images/logo6.jpeg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0,
    },
    {
      id: 3,
      name: "Jagan Super Strikers",
      logo: "./images/logo7.jpeg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0,
    },
    {
      id: 4,
      name: "Dipak Warriors",
      logo: "./images/logo3.jpg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0, // will still go top because of auto points
    },
    {
      id: 5,
      name: "Black Panthers",
      logo: "./images/logo4.jpeg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0,
    },
    {
      id: 6,
      name: "Shree Yodha",
      logo: "./images/logo5.jpeg",
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      exp: "0",
      points: 0,
    },
  ]);

  // Enrich teams with autoPoints (from wins/ties) and numeric EXP
  const enrichedTeams = useMemo(
    () =>
      teams.map((team) => {
        const autoFromRecord = team.won * 2 + team.tied * 1;
        // If you want manual override, use team.points when it's > 0
        const autoPoints =
          typeof team.points === "number" && team.points > 0
            ? team.points
            : autoFromRecord;

        return {
          ...team,
          autoPoints,
          expNumber: parseFloat(team.exp) || 0,
        };
      }),
    [teams]
  );

  // Sort: points desc → exp desc → name asc
  const sortedTeams = useMemo(
    () =>
      [...enrichedTeams].sort((a, b) => {
        if (b.autoPoints !== a.autoPoints) {
          return b.autoPoints - a.autoPoints;
        }
        if (b.expNumber !== a.expNumber) {
          return b.expNumber - a.expNumber;
        }
        return a.name.localeCompare(b.name);
      }),
    [enrichedTeams]
  );

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.heading}>MPL 2025 Points Table</h2>

      <div className={styles.scrollWrapper}>
        <table className={styles.pointsTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Logo</th>
              <th>Played</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Tied</th>
              <th>NRR / EXP</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr
                key={team.id}
                className={index === 0 ? styles.topRow : undefined}
              >
                <td>{index + 1}</td>
                <td className={styles.teamNameCell}>{team.name}</td>
                <td>
                  <img
                    src={team.logo}
                    alt={`${team.name} logo`}
                    className={styles.logo}
                  />
                </td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.lost}</td>
                <td>{team.tied}</td>
                <td>{team.exp}</td>
                <td>{team.autoPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.note}>
        * Ranking auto-updates based on wins, ties and EXP / NRR.
      </p>
    </div>
  );
};
