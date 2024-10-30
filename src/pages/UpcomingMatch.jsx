import React, { useState } from "react";
import "./AdminDesign/UpcomingMatch.css";

export const UpcomingMatch = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    team1: { name: "", logo: null },
    team2: { name: "", logo: null },
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("team1") || name.startsWith("team2")) {
      const team = name.split(".")[0];
      const field = name.split(".")[1];
      setNewMatch((prev) => ({
        ...prev,
        [team]: {
          ...prev[team],
          [field]: value,
        },
      }));
    } else {
      setNewMatch((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLogoUpload = (e, team) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setNewMatch((prev) => ({
      ...prev,
      [team]: { ...prev[team], logo: fileUrl },
    }));
  };

  const handleAddMatch = () => {
    if (
      newMatch.team1.name &&
      newMatch.team1.logo &&
      newMatch.team2.name &&
      newMatch.team2.logo &&
      newMatch.date &&
      newMatch.time
    ) {
      setMatches((prevMatches) => [
        ...prevMatches,
        { ...newMatch, id: Date.now() },
      ]);
      setNewMatch({
        team1: { name: "", logo: null },
        team2: { name: "", logo: null },
        date: "",
        time: "",
      });
    } else {
      alert("Please fill in all fields to add a match.");
    }
  };

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter((match) => match.id !== id));
  };

  return (
    <div className="admin-matches">
      <h1 className="admin-matches__header">Admin - Manage Matches</h1>

      <div className="admin-matches__form">
        <h2 className="form__title">Add New Match</h2>
        <input
          type="text"
          name="team1.name"
          placeholder="Team 1 Name"
          value={newMatch.team1.name}
          onChange={handleInputChange}
          className="form__input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e, "team1")}
          className="form__input"
        />
        <input
          type="text"
          name="team2.name"
          placeholder="Team 2 Name"
          value={newMatch.team2.name}
          onChange={handleInputChange}
          className="form__input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e, "team2")}
          className="form__input"
        />
        <input
          type="text"
          name="date"
          placeholder="Date (e.g., 10 Jan 2025)"
          value={newMatch.date}
          onChange={handleInputChange}
          className="form__input"
        />
        <input
          type="text"
          name="time"
          placeholder="Time (e.g., 10:30 AM)"
          value={newMatch.time}
          onChange={handleInputChange}
          className="form__input"
        />
        <button onClick={handleAddMatch} className="form__button">
          Add Match
        </button>
      </div>

      <div className="admin-matches__list">
        <h2 className="list__title">Matches List</h2>
        {matches.length > 0 ? (
          matches.map((match) => (
            <>
              <div className="list__card" key={match.id}>
                <div className="card__team">
                  <p className="team__name">{match.team1.name}</p>
                  {match.team1.logo && (
                    <img
                      src={match.team1.logo}
                      alt={`${match.team1.name} logo`}
                      className="team__logo"
                    />
                  )}
                </div>
                <h2 className="card__vs">vs</h2>
                <div className="card__team">
                  <p className="team__name">{match.team2.name}</p>
                  {match.team2.logo && (
                    <img
                      src={match.team2.logo}
                      alt={`${match.team2.name} logo`}
                      className="team__logo"
                    />
                  )}
                      </div>
                   
                <div className="card__info">
                  <p className="info__date">Date: {match.date}</p>
                  <p className="info__time">Time: {match.time}</p>
                      </div>
                 
                <button
                  onClick={() => handleDeleteMatch(match.id)}
                  className="card__delete-button"
                >
                  Delete
                </button>
              </div>
            </>
          ))
        ) : (
          <p className="list__empty-message">
            No matches added yet. Use the form above to add matches.
          </p>
        )}
      </div>
    </div>
  );
};
