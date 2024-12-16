import React from "react";
import "./design/Schedule.css";

export const Schedule = () => {
  
const matches = [
  // Day 1
  {
    id: 1,
    teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
    teamB: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
  },
  {
    id: 2,
    teamA: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
    teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
  },
  {
    id: 3,
    teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
    teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
  },

  // Day 2
  {
    id: 4,
    teamA: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
    teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
  },
  {
    id: 5,
    teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
    teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
  },
  {
    id: 6,
    teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
    teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
  },

  // Day 3

  {
    id: 7,
    teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
    teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
  },
  {
    id: 8,
    teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
    teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
  },
  {
    id: 9,
    teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
    teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
  },

  // Day 4

  {
    id: 10,
    teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
    teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
  },

  {
    id: 11,
    teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
    teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
  },
  {
    id: 12,
    teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
    teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
  },

  // Day 5

  {
    id: 13,
    teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
    teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
  },
  {
    id: 14,
    teamA: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
    teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
  },
  {
    id: 13,
    teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
    teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
  },
];


  return (
    <div className="schedule-container">
      <h2>Schedule Upcoming Cricket Matches</h2>
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
