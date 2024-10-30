import React from "react";
import "./design/Matches.css";

// Sample match data with date and time
const matches = [
  {
    id: 1,
    team1: {
      name: "Royal Challengers Bangalore",
      logo: "./images/rcb.webp",
    },
    team2: {
      name: "Mumbai Indians",
      logo: "./images/mi.png",
    },
    date: "10 Jan 2025-",
    time: "10:30 Am",
  },
  {
    id: 2,
    team1: {
      name: "Chennai Super Kings",
      logo: "./images/csk.png",
    },
    team2: {
      name: "Mumbai Indians",
      logo: "./images/mi.png",
    },
    date: "10 Jan 2025-",
    time: "02:30 Am",
  },
  {
    id: 3,
    team1: {
      name: "Royal Challengers Bangalore",
      logo: "./images/rcb.webp",
    },
    team2: {
      name: "Chennai Super Kings",
      logo: "./images/csk.png",
    },
    date: "11 Jan 2025-",
    time: "11:00 Am",
  },
];

export const Matches = () => {
  return (
    <div className="match-page">
      <div className="matches-container">
        <h1>Upcoming Matches</h1>
        {matches.map((match) => (
          <div className="match-card" key={match.id}>
            <div className="team">
              <p>{match.team1.name}</p>
              <img src={match.team1.logo} alt={`${match.team1.name} logo`} />
            </div>
            <h2>vs</h2>
            <div className="team">
              <p>{match.team2.name}</p>
              <img src={match.team2.logo} alt={`${match.team2.name} logo`} />
            </div>
            <div></div>
            <div className="match-info">
              <p>Date: {match.date}</p>
              <p>Time: {match.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
