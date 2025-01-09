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
              massage: `🎉Final 14 Jan 11Am🏏🥳`,
            },
            {
              id: 2,
              massage: `🎉Semi Finals 12 Jan 11Am Start🏏🥳`,
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
