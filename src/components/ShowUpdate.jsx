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
              massage: "Auction Date 1st Nov 2024",
            },
            {
              id: 2,
              massage: "Auction Time at 10:30 am. ",
            },
            {
              id: 3,
              massage: "MPL Tournament Start From 1st Jan 2025",
            },
            {
              id: 4,
              massage: "Today's Match Cancel",
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
