import React, { useEffect, useState } from "react";
import "./design/Update.css";

export const ShowUpdate = () => {
  const [matchData, setMatchData] = useState([]);

  // Simulate API data fetching
  useEffect(() => {
    const fetchMatchData = async () => {
      // Simulating an API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              massage: `1st Match Dipak Warriors Vs Malkheda Panthers 🏏 Result : Dipak Warriors won by 29 Run 🥳`,
            },
            {
              id: 2,
              massage:
                "2nd Match Shree Yodha Vs Jagan Super Strikers 🏏 Result : Jagan Super Strikers won by 48 Run 🥳",
            },
            {
              id: 3,
              massage:
                "3rd Match Vishwanath Warriors Vs Vishnu Blaster 🏏 Result : Vishnu Blaster won by 44 Run 🥳",
            },
          ]);
        }, 1000); // Simulating network delay
      });

      setMatchData(response);
    };

    fetchMatchData();
  }, []);

  return (
    <>
      <div className="update-page">
        <div className="show-update-container">
          <h2>Today's MPL Update</h2>
          {matchData.length > 0 ? (
            matchData.map((match) => (
              <div key={match.id} className="match-details">
                <p>{match.massage}</p>
              </div>
            ))
          ) : (
            <p>Today's MPL Update Not Available </p>
          )}
        </div>
      </div>
    </>
  );
};
