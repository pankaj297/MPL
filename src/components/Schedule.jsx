import React from "react";
import styles from "./design/Schedule.module.css";

export const Schedule = () => {
  const matches = [
    // Day 1
    {
      id: 1,
      day: 1,
      date: "07/01/2025",
      teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
      teamB: { name: "Ram Rajya Pratishthan", logo: "./images/logo4.jpeg" },
    },
    {
      id: 2,
      day: 1,
      date: "07/01/2025",
      teamA: { name: "Mata Nagar", logo: "./images/logo8.jpeg" },
      teamB: { name: "Jijau Fighter", logo: "./images/logoJijau.jpeg" },
    },
    {
      id: 3,
      day: 1,
      date: "07/01/2025",
      teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
      teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
    },

    // Day 2
    {
      id: 4,
      day: 2,
      date: "08/01/2025",
      teamA: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
      teamB: { name: "Jijau Fighter", logo: "./images/logoJijau.jpeg" },
    },
    {
      id: 5,
      day: 2,
      date: "08/01/2025",
      teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
      teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
    },
    {
      id: 6,
      day: 2,
      date: "08/01/2025",
      teamA: { name: "Ram Rajya Pratishthan", logo: "./images/logo4.jpeg" },
      teamB: { name: "Mata Nagar", logo: "./images/logo8.jpeg" },
    },

    // Day 3
    {
      id: 7,
      day: 3,
      date: "09/01/2025",
      teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
      teamB: { name: "Mata Nagar", logo: "./images/logo8.jpeg" },
    },
    {
      id: 8,
      day: 3,
      date: "09/01/2025",
      teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
      teamB: { name: "Jijau Fighter", logo: "./images/logoJijau.jpeg" },
    },
    {
      id: 9,
      day: 3,
      date: "09/01/2025",
      teamA: { name: "Ram Rajya Pratishthan", logo: "./images/logo4.jpeg" },
      teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
    },

    // Day 4
    {
      id: 10,
      day: 4,
      date: "10/01/2025",
      teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
      teamB: { name: "Mata Nagar", logo: "./images/logo8.jpeg" },
    },
    {
      id: 11,
      day: 4,
      date: "10/01/2025",
      teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
      teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
    },
    {
      id: 12,
      day: 4,
      date: "10/01/2025",
      teamA: { name: "Ram Rajya Pratishthan", logo: "./images/logo4.jpeg" },
      teamB: { name: "Jijau Fighter", logo: "./images/logoJijau.jpeg" },
    },

    // Day 5
    {
      id: 13,
      day: 5,
      date: "11/01/2025",
      teamA: {
        name: "Jijau Fighter",
        logo: "./images/logoJijau.jpeg",
      },
      teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
    },
    {
      id: 14,
      day: 5,
      date: "11/01/2025",
      teamA: { name: "Mata Nagar", logo: "./images/logo8.jpeg" },
      teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
    },
    {
      id: 15,
      day: 5,
      date: "11/01/2025",
      teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
      teamB: { name: "Ram Rajya Pratishthan", logo: "./images/logo4.jpeg" },
    },

    // Semi Finals - Day 6
    {
      id: 16,
      day: 6,
      date: "12/01/2025",
      teamA: {
        name: "TBC (Qualify 1)",
        logo: "./images/logo1.png",
      },
      teamB: {
        name: "TBC (Qualify 3)",
        logo: "./images/logo1.png",
      },
    },
    {
      id: 17,
      day: 6,
      date: "12/01/2025",
      teamA: {
        name: "TBC (Qualify 2)",
        logo: "./images/logo1.png",
      },
      teamB: { name: "TBC (Qualify 4)", logo: "./images/logo1.png" },
    },

    // Third Place - Day 7
    {
      id: 18,
      day: 7,
      date: "12/01/2025",
      teamA: { name: "Semi Final Loser 1", logo: "./images/logo1.png" },
      teamB: { name: "Semi Final Loser 2", logo: "./images/logo1.png" },
    },

    // Final - Day 8
    {
      id: 19,
      day: 8,
      date: "13/01/2025",
      teamA: { name: "Finalist 1", logo: "./images/logo1.png" },
      teamB: { name: "Finalist 2", logo: "./images/logo1.png" },
    },
  ];

  return (
    <div className={styles.schedulePage}>
      <div className={styles.scheduleContainer}>
        <h2 className={styles.heading}>
          {/* MPL Schedule – Upcoming Cricket Matches */}
          MPL Schedule – Demo
        </h2>

        <div className={styles.matchesGrid}>
          {matches.map((match) => (
            <div key={match.id} className={styles.matchCard}>
              {/* Top badge: Day + Match */}
              <div className={styles.matchInfoTop}>
                <span className={styles.dayBadge}>Day {match.day}</span>
                <span className={styles.matchNumber}>Match {match.id}</span>
              </div>

              {/* Teams row */}
              <div className={styles.teamsRow}>
                <div className={styles.team}>
                  <img
                    src={match.teamA.logo}
                    alt={`${match.teamA.name} logo`}
                    className={styles.teamLogo}
                  />
                  <span className={styles.teamName}>{match.teamA.name}</span>
                </div>

                <div className={styles.vsWrapper}>
                  <span className={styles.vs}>VS</span>
                </div>

                <div className={styles.team}>
                  <img
                    src={match.teamB.logo}
                    alt={`${match.teamB.name} logo`}
                    className={styles.teamLogo}
                  />
                  <span className={styles.teamName}>{match.teamB.name}</span>
                </div>
              </div>

              {/* Bottom date */}
              <div className={styles.dateRow}>
                <span className={styles.dateLabel}>Date</span>
                <span className={styles.dateValue}>{match.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
