// src/PriceMoney.jsx
import React from "react";
import "./design/PriceMoney.css"; // Ensure the path is correct

const prizeData = [
  {
    id: 1,
    title: "Final Winner",
    price: "₹50,000",
    image: "./images/cskwinner.avif", // Replace with actual image path
  },
  {
    id: 2,
    title: "Runner Up",
    price: "₹30,000",
    image: "./images/g7.jpg", // Replace with actual image path
  },
  {
    id: 3,
    title: "Semi Finalist",
    price: "₹15,000",
    image: "./images/g1.jpg", // Replace with actual image path
  },
  {
    id: 4,
    title: "Best Batter Of the Session",
    price: "₹5,000",
    image: "./images/g27.jpg", // Replace with actual image path
  },
  {
    id: 5,
    title: "Best Bowler Of the Session",
    price: "₹5,000",
    image: "./images/g60.jpg", // Replace with actual image path
  },
];

export const PriceMoney = () => {
  return (
    <div className="price-money-section">
      <h2>Prize Money</h2>
      <div className="price-money-container">
        {prizeData.map((prize) => (
          <div key={prize.id} className="price-money-content">
            <img src={prize.image} alt={prize.title} />
            <div className="price-money-text">
              <h3>{prize.title}</h3>
              <p>Prize: 💸 {prize.price} 🤑</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
