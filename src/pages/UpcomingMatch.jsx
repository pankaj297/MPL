import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDesign/UpcomingMatch.module.css";

export const UpcomingMatch = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    team1: { name: "", logo: null },
    team2: { name: "", logo: null },
    date: "",
    time: "",
    winner: "",
  });
  const [loading, setLoading] = useState(false);

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
    if (!file) return;

    setNewMatch((prev) => ({
      ...prev,
      [team]: { ...prev[team], logo: file },
    }));
  };

  // Add Match
  const handleAddMatch = async () => {
    if (
      newMatch.team1.name &&
      newMatch.team1.logo &&
      newMatch.team2.name &&
      newMatch.team2.logo &&
      newMatch.date &&
      newMatch.time
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("team1.name", newMatch.team1.name);
      formData.append("team1Logo", newMatch.team1.logo);
      formData.append("team2.name", newMatch.team2.name);
      formData.append("team2Logo", newMatch.team2.logo);
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
        setLoading(false);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Delete Match
  const handleDeleteMatch = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this match?");
    if (!ok) return;

    try {
      const response = await axios.delete(
        `https://mpl-backend-5gc6.onrender.com/api/match/deletematch/${id}`
      );
      if (response.data.message === "Match deleted successfully") {
        setMatches((prev) => prev.filter((match) => match._id !== id));
      } else {
        alert(response.data.message || "Failed to delete match");
      }
    } catch (error) {
      alert(
        "Failed to delete match: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className={styles.adminMatches}>
      <h1 className={styles.header}>Admin – Manage Matches</h1>

      <div className={styles.grid}>
        {/* Add Match Form */}
        <section className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Match</h2>

          <label className={styles.label}>
            Team 1 Name
            <input
              type="text"
              name="team1.name"
              placeholder="Team 1 Name"
              value={newMatch.team1.name}
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Team 1 Logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e, "team1")}
              name="team1Logo"
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Team 2 Name
            <input
              type="text"
              name="team2.name"
              placeholder="Team 2 Name"
              value={newMatch.team2.name}
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Team 2 Logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e, "team2")}
              name="team2Logo"
              className={styles.input}
            />
          </label>

          <div className={styles.inlineRow}>
            <label className={styles.label}>
              Date
              <input
                type="date"
                name="date"
                value={newMatch.date}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Time
              <input
                type="time"
                name="time"
                value={newMatch.time}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>
          </div>

          <button
            onClick={handleAddMatch}
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Adding Match..." : "Add Match"}
          </button>
        </section>

        {/* Match List */}
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Upcoming Matches</h2>

          {matches.length === 0 && (
            <p className={styles.emptyText}>No matches added yet.</p>
          )}

          <div className={styles.matchesList}>
            {matches.map((match) => (
              <article key={match._id} className={styles.matchCard}>
                <div className={styles.matchDetails}>
                  <div className={styles.team}>
                    <img
                      src={match.team1.logo}
                      alt={match.team1.name}
                      className={styles.teamLogo}
                    />
                    <span className={styles.teamName}>{match.team1.name}</span>
                  </div>

                  <span className={styles.vs}>vs</span>

                  <div className={styles.team}>
                    <img
                      src={match.team2.logo}
                      alt={match.team2.name}
                      className={styles.teamLogo}
                    />
                    <span className={styles.teamName}>{match.team2.name}</span>
                  </div>

                  <div className={styles.matchInfo}>
                    <span className={styles.matchDate}>{match.date}</span>
                    <span className={styles.matchTime}>{match.time}</span>
                  </div>
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteMatch(match._id)}
                >
                  Delete Match
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
