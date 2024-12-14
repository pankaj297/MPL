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
              massage: "लाईव्ह Auctions तारीख: १४ डिसेंबर २०२४",
            },
            {
              id: 2,
              massage: "Auction रात्री 08 : 00 वाजता",
            },
            {
              id: 3,
              massage: "एमपीएल स्पर्धा 05 जानेवारी 2025 पासून सुरू होईल.",
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
