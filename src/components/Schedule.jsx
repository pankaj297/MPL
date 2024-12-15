import React from "react";
import "./design/Schedule.css";

export const Schedule = () => {
  const matches = [
    {
      id: 1,
      teamA: {
        name: "Dipak Warriors",
        logo: "./images/logo3.jpg",
      },
      teamB: {
        name: "Malkheda Panthers",
        logo: "./images/logo4.jpeg",
      },
    },
    {
      id: 2,
      teamA: {
        name: "Vishwanath Warriors",
        logo: "./images/logo2.jpeg",
      },
      teamB: {
        name: "Shree Yodha",
        logo: "./images/logo5.jpeg",
      },
    },
    {
      id: 3,
      teamA: {
        name: "Vishnu Blaster",
        logo: "./images/logo6.jpeg",
      },
      teamB: {
        name: "Jagan Super Strikers",
        logo: "./images/logo7.jpeg",
      },
    },
    {
      id: 4,
      teamA: {
        name: "Dipak Warriors",
        logo: "./images/logo3.jpg",
      },
      teamB: {
        name: "Malkheda Panthers",
        logo: "./images/logo4.jpeg",
      },
    },
    {
      id: 5,
      teamA: {
        name: "Vishwanath Warriors",
        logo: "./images/logo2.jpeg",
      },
      teamB: {
        name: "Jagan Super Strikers",
        logo: "./images/logo7.jpeg",
      },
    },
    {
      id: 6,
      teamA: {
        name: "Vishnu Blaster",
        logo: "./images/logo6.jpeg",
      },
      teamB: {
        name: "Shree Yodha",
        logo: "./images/logo5.jpeg",
      },
    },
  ];

  return (
    <div className="schedule-container">
      <h2>Demo Schedule Upcoming Cricket Matches</h2>
      <div className="matchess">
        {matches.map((match) => (
          <div key={match.id} className="match-cards">
            <div className="team">
              <img src={match.teamA.logo} alt={`${match.teamA.name} logo`} />
              <span>{match.teamA.name}</span>
            </div>
            <span className="vs">VS</span>
            <div className="team">
              <img src={match.teamB.logo} alt={`${match.teamB.name} logo`} />
              <span>{match.teamB.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
