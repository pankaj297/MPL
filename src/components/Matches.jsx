import React from "react";
import "./design/Matches.css";

// Sample match data
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
  },
  {
    id: 2,
    team1: {
      name: "Chennai Super Kings ",
      logo: "./images/csk.png",
    },
    team2: {
      name: "Mumbai Indians",
      logo: "./images/mi.png",
    },
  },
  {
    id: 3,
    team1: {
      name: "Royal Challengers Bangalore",
      logo: "./images/rcb.webp",
    },
    team2: {
      name: "Chennai Super Kings ",
      logo: "./images/csk.png",
    },
  },
];

export const Matches = () => {
  return (
    <>
      <div className="match-page">
        <div className="matches-container">
          <h1>Upcoming Matches</h1>
          {matches.map((match) => (
            <div className="match-card" key={match.id}>
              <div className="team">
                <img src={match.team1.logo} alt={`${match.team1.name} logo`} />
                <p>{match.team1.name}</p>
              </div>
              <h2>vs</h2>
              <div className="team">
                <img src={match.team2.logo} alt={`${match.team2.name} logo`} />
                <p>{match.team2.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
