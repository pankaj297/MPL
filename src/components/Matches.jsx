import React, { useEffect, useState } from "react";
import axios from "axios";
import "./design/Matches.css";

export const Matches = () => {
  const [matches, setMatches] = useState([]); // State to hold matches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch matches from the backend
    const fetchMatches = async () => {
      try { 
        const response = await axios.get(
          "https://mpl-backend-5gc6.onrender.com/api/match/getmatches"
        );
        setMatches(response.data); // Update the matches state
        console.log(response);
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error(err);
        setError("Failed to load matches");
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Show loading or error message
  if (loading) return <p className="loader">Loading matches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="match-page">
      <div className="matches-container">
        <h1 className="Upcomeing-heading">Upcoming Cricket Matches</h1>
        {matches.length === 0 ? ( // Check if matches array is empty
          <p className="no-matches">No matches found</p>
        ) : (
          matches.map((match) => (
            <div className="match-card" key={match._id}>
              <div className="team">
                <p>{match.team1.name}</p>
                <img
                  src={match.team1.logo}
                  alt={`${match.team1.name} logo`}
                  className="team-logo"
                />
              </div>
              <h2 className="vs">vs</h2>
              <div className="team">
                <p>{match.team2.name}</p>
                <img
                  src={match.team2.logo}
                  alt={`${match.team2.name} logo`}
                  className="team-logo"
                />
              </div>

              <div className="match-info">
                <p>Time: {match.time}</p>
              </div>
              <div className="match-info">
                <p>Date: {new Date(match.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
