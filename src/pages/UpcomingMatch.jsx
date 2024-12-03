import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./AdminDesign/UpcomingMatch.css";

export const UpcomingMatch = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    team1: { name: "", logo: null },
    team2: { name: "", logo: null },
    date: "",
    time: "",
    winner: "",
  });
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch Matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://mpl-backend-5gc6.onrender.com/api/match/getmatches"
        );
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("team1") || name.startsWith("team2")) {
      const [team, field] = name.split(".");
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

  // Handle Logo Upload
  const handleLogoUpload = (e, team) => {
    const file = e.target.files[0];
    setNewMatch((prev) => ({
      ...prev,
      [team]: { ...prev[team], logo: file },
    }));
  };

  // Add Match
  const handleAddMatch = async () => {
    console.log("Team1 Name:", newMatch.team1.name);
    console.log("Team1 Logo:", newMatch.team1.logo);
    console.log("Team2 Name:", newMatch.team2.name);
    console.log("Team2 Logo:", newMatch.team2.logo);
    console.log("Date:", newMatch.date);
    console.log("Time:", newMatch.time);

    if (
      newMatch.team1.name &&
      newMatch.team1.logo &&
      newMatch.team2.name &&
      newMatch.team2.logo &&
      newMatch.date &&
      newMatch.time
    ) {
      setLoading(true); // Set loading to true when request starts
      const formData = new FormData();
      formData.append("team1.name", newMatch.team1.name);
      formData.append("team1.logo", newMatch.team1.logo);
      formData.append("team2.name", newMatch.team2.name);
      formData.append("team2.logo", newMatch.team2.logo);
      formData.append("date", newMatch.date);
      formData.append("time", newMatch.time);
      formData.append("winner", newMatch.winner);

      try {
        const response = await axios.post(
          "https://mpl-backend-5gc6.onrender.com/api/match/addmatch",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 100000,
          }
        );
        alert(response.data.message);
        setMatches((prevMatches) => [...prevMatches, response.data.match]);
        setNewMatch({
          team1: { name: "", logo: null },
          team2: { name: "", logo: null },
          date: "",
          time: "",
          winner: "",
        });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to add match";
        alert(errorMessage);
      } finally {
        setLoading(false); // Reset loading to false once request is complete
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Delete Match
  const handleDeleteMatch = async (id) => {
    try {
      const response = await axios.delete(
        `https://mpl-backend-5gc6.onrender.com/api/match/deletematch/${id}`
      );
      if (response.data.message === "Match deleted successfully") {
        setMatches(matches.filter((match) => match._id !== id));
      }
    } catch (error) {
      alert(
        "Failed to delete match: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="admin-matches">
      <h1 className="admin-matches__header">Admin - Manage Matches</h1>

      {/* Add Match Form */}
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
          type="date"
          name="date"
          value={newMatch.date}
          onChange={handleInputChange}
          className="form__input"
        />
        <input
          type="time"
          name="time"
          value={newMatch.time}
          onChange={handleInputChange}
          className="form__input"
        />
        <button
          onClick={handleAddMatch}
          className="form__button"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Adding Match..." : "Add Match"} {/* Show loading text */}
        </button>
      </div>

      {/* Match List */}
      <div className="admin-matches__list">
        <h2 className="list__title">Upcoming Matches</h2>
        {matches && matches.length > 0 ? (
          <ul>
            {matches.map((match) => (
              <li key={match._id} className="match__item">
                <h3>
                  {match.team1.name} vs {match.team2.name}
                </h3>
                <p>Date: {match.date}</p>
                <p>Time: {match.time}</p>
                <button
                  onClick={() => handleDeleteMatch(match._id)}
                  className="list__button"
                >
                  Delete Match
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming matches available.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingMatch;