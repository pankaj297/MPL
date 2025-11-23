import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./design/Matches.module.css";

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://mpl-backend-5gc6.onrender.com/api/match/getmatches"
        );
        setMatches(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load matches");
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className={styles.loader}>Loading matches...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.matchPage}>
      <div className={styles.matchesContainer}>
        <h1 className={styles.upcomingHeading}>Upcoming Cricket Matches</h1>

        {matches.length === 0 ? (
          <p className={styles.noMatches}>No matches found</p>
        ) : (
          matches.map((match) => (
            <div className={styles.matchCard} key={match._id}>
              {/* Team 1 */}
              <div className={styles.team}>
                <img
                  src={match.team1.logo}
                  alt={`${match.team1.name} logo`}
                  className={styles.teamLogo}
                />
                <p className={styles.teamName}>{match.team1.name}</p>
              </div>

              {/* VS */}
              <div className={styles.vsWrapper}>
                <h2 className={styles.vs}>VS</h2>
              </div>

              {/* Team 2 */}
              <div className={styles.team}>
                <img
                  src={match.team2.logo}
                  alt={`${match.team2.name} logo`}
                  className={styles.teamLogo}
                />
                <p className={styles.teamName}>{match.team2.name}</p>
              </div>

              {/* Match Meta Info */}
              <div className={styles.matchMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Time</span>
                  <span className={styles.metaValue}>
                    {new Date(`1970-01-01T${match.time}`).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        timeZone: "Asia/Kolkata",
                      }
                    )}
                  </span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Date</span>
                  <span className={styles.metaValue}>
                    {new Date(match.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      timeZone: "Asia/Kolkata",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
