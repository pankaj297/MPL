
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDesign/TotalSoldOutPlayers.css";

export const TotalSoldOutPlayers = () => {
  const [soldOutPlayers, setSoldOutPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSoldOutPlayers();
  }, []);

  const fetchSoldOutPlayers = async () => {
    try {
      const response = await axios.get(
        "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
      );
      setSoldOutPlayers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      await axios.delete(
        `https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/deletefinalisedbidding/${playerId}`
      );
      setSoldOutPlayers(
        soldOutPlayers.filter((player) => player._id !== playerId)
      );
      alert("Player deleted successfully.");
    } catch (err) {
      alert("Error deleting player: " + err.message);
    }
  };

  const handlePrintTable = () => {
    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>MPL Sold Out Players</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border: 1px solid #ddd; }
            th { background-color: #3498db; color: white; }
            .status { color: green; font-weight: bold; }
            .author { position: absolute; bottom: 10px; right: 10px; font-size: 15px; color: #666; }
          </style>
        </head>
        <body>
          <h2>Sold Out Players</h2>
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Sold Out Price (₹)</th>
                <th>Selected Team</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${soldOutPlayers
                .map(
                  (player, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                    <td>${player.position}</td>
                    <td>${player.currentBid}</td>
                    <td>${player.lastBiddingTeam}</td>
                    <td class="status">Sold</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
          <div class="author">Author: Pankaj Naik</div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.onload = () => {
      newWindow.print();
    };
  };

  const handleSendMessage = (player) => {
    const message =
      ` Congratulations, ${player.name}! \n\n` +
      `You are sold out from **${player.lastBiddingTeam}**.\n` +
      `Your sold-out price is **₹${player.currentBid}**.\n\n` +
      `Thank you for being a part of the Malkheda Primer League!`;
    
       const encodedMessage = encodeURIComponent(message);
       const whatsappUrl = `https://wa.me/${player.mobile}?text=${encodedMessage}`;
       window.open(whatsappUrl, "_blank");

    // // const phoneNumber = `${phoneNumber}`; 
    // // const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    //   message
    // // )}`;
    // window.open(url, "_blank");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="total-sold-out-players-container">
      <h1 className="admin-header">MPL Total Sold Out Players</h1>
      <button onClick={handlePrintTable} className="admin-print-button">
        Print Sold Out Players
      </button>
      <div className="table-responsive">
        <table className="sold-out-players-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Sold Out Price (₹)</th>
              <th>Selected Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {soldOutPlayers.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.position}</td>
                <td>{player.currentBid}</td>
                <td>{player.lastBiddingTeam}</td>
                <td className="status">Sold</td>
                <td>
                  <button
                    onClick={() => handleSendMessage(player)}
                    className="admin-send-message-button"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => handleDeletePlayer(player._id)}
                    className="admin-delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




// ================================================================



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminDesign/TotalSoldOutPlayers.css";

// export const TotalSoldOutPlayers = () => {
//   const [soldOutPlayers, setSoldOutPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSoldOutPlayers();
//   }, []);

//   const fetchSoldOutPlayers = async () => {
//     try {
//       const response = await axios.get(
//         "https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/getfinalisedbiddings"
//       );
//       setSoldOutPlayers(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDeletePlayer = async (playerId) => {
//     try {
//       await axios.delete(
//         `https://mpl-backend-5gc6.onrender.com/api/finalisedbiddings/deletefinalisedbidding/${playerId}`
//       );
//       setSoldOutPlayers(soldOutPlayers.filter((player) => player._id !== playerId));
//       alert("Player deleted successfully.");
//     } catch (err) {
//       alert("Error deleting player: " + err.message);
//     }
//   };

//   const handlePrintTable = () => {
//     const newWindow = window.open("", "", "width=600,height=600");
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>MPL Sold Out Players</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             h2 { text-align: center; }
//             table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//             th, td { padding: 10px; border: 1px solid #ddd; }
//             th { background-color: #3498db; color: white; }
//             .status { color: green; font-weight: bold; }
//             .author { position: absolute; bottom: 10px; right: 10px; font-size: 15px; color: #666; }
//           </style>
//         </head>
//         <body>
//           <h2>Sold Out Players</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Position</th>
//                 <th>Sold Out Price (₹)</th>
//                 <th>Selected Team</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${soldOutPlayers
//                 .map(
//                   (player, index) => `
//                   <tr>
//                     <td>${index + 1}</td>
//                     <td>${player.fullName}</td>
//                     <td>${player.age}</td>
//                     <td>${player.position}</td>
//                     <td>${player.soldOutPrice}</td>
//                     <td>${player.selectedTeam}</td>
//                     <td class="status">Sold</td>
//                   </tr>
//                 `
//                 )
//                 .join("")}
//             </tbody>
//           </table>
//           <div class="author">Author: Pankaj Naik</div>
//         </body>
//       </html>
//     `);
//     newWindow.document.close();
//     newWindow.print();
//   };

//   const handleSendMessage = (player) => {
//     const message =
//       ` Congratulations, ${player.fullName}! \n\n` +
//       `You are sold out from **${player.selectedTeam}**.\n` +
//       `Your sold-out price is **₹${player.soldOutPrice}**.\n\n` +
//       `Thank you for being a part of the Malkheda Primer League!`;

//     const phoneNumber = "+917276028036"; // Replace with the actual phone number
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(url, "_blank");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="total-sold-out-players-container">
//       <h1 className="admin-header">MPL Total Sold Out Players</h1>
//       <button onClick={handlePrintTable} className="admin-print-button">
//         Print Sold Out Players
//       </button>
//       <div className="table-responsive">
//         <table className="sold-out-players-table">
//           <thead>
//             <tr>
//               <th>Sr No</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Position</th>
//               <th>Sold Out Price (₹)</th>
//               <th>Selected Team</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {soldOutPlayers.map((player, index) => (
//               <tr key={player._id}>
//                 <td>{index + 1}</td>
//                 <td>{player.name}</td>
//                 <td>{player.age}</td>
//                 <td>{player.position}</td>
//                 <td>{player.currentBid}</td>
//                 <td>{player.lastBiddingTeam}</td>
//                 <td className="status">Sold</td>
//                 <td>
//                   <button
//                     onClick={() => handleSendMessage(player)}
//                     className="admin-send-message-button"
//                   >
//                     Send Message
//                   </button>
//                   <button
//                     onClick={() => handleDeletePlayer(player._id)}
//                     className="admin-delete-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };



// ===========================================================

// import React, { useState } from "react";
// import "./AdminDesign/TotalSoldOutPlayers.css";

// export const TotalSoldOutPlayers = () => {
//   const [soldOutPlayers, setSoldOutPlayers] = useState([
//     {
//       id: 1,
//       fullName: "Baban Ratilal Naik",
//       mobileNum: "+917123456789", // Replace with actual mobile numbers
//       age: 21,
//       position: "All Rounder",
//       soldOutPrice: 1500,
//       selectedTeam: "Chennai Super Kings",
//       transactionId: "TXN12345",
//       payment: 1500,
//       // Change as needed
//     },
//     {
//       id: 2,
//       fullName: "Pankaj Suklal Naik",
//       mobileNum: "+917987654321", // Replace with actual mobile numbers
//       age: 24,
//       position: "Batsman",
//       soldOutPrice: 2000,
//       selectedTeam: "Mumbai Indians",
//       transactionId: "TXN12346",
//       payment: 2000,
//       // Change as needed
//     },
//     // Add more players as needed
//   ]);

//   const handleDeletePlayer = (playerId) => {
//     setSoldOutPlayers(
//       soldOutPlayers.filter((player) => player.id !== playerId)
//     );
//   };

//   const handlePrintTable = () => {
//     const newWindow = window.open("", "", "width=600,height=600");
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>MPL Sold Out Players</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             h2 { text-align: center; }
//             table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//             th, td { padding: 10px; border: 1px solid #ddd; }
//             th { background-color: #3498db; color: white; }
//             .status { color: green; font-weight: bold; }
//             .author { position: absolute; bottom: 10px; right: 10px; font-size: 15px; color: #666; }
//           </style>
//         </head>
//         <body>
//           <h2>Sold Out Players</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Position</th>
//                 <th>Sold Out Price (₹)</th>
//                 <th>Selected Team</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${soldOutPlayers
//                 .map(
//                   (player, index) => `
//                   <tr>
//                     <td>${index + 1}</td>
//                     <td>${player.fullName}</td>
//                     <td>${player.age}</td>
//                     <td>${player.position}</td>
//                     <td>${player.soldOutPrice}</td>
//                     <td>${player.selectedTeam}</td>
//                     <td class="status">Sold</td>
//                   </tr>
//                 `
//                 )
//                 .join("")}
//             </tbody>
//           </table>
//           <div class="author">Author: Pankaj Naik</div>
//         </body>
//       </html>
//     `);
//     newWindow.document.close();
//     newWindow.print();
//   };

//   const handleSendMessage = (player) => {
//     const message =
//       ` Congratulations, ${player.fullName}! \n\n` +
//       `You are sold out from **${player.selectedTeam}**.\n` +
//       `Your sold-out price is **₹${player.soldOutPrice}**.\n\n` +
//       `Thank you for being a part of the Malkheda Primer League!`;

//     const phoneNumber = "+917276028036"; // Replace with the actual phone number
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="total-sold-out-players-container">
//       <h1 className="admin-header">MPL Total Sold Out Players</h1>
//       <button onClick={handlePrintTable} className="admin-print-button">
//         Print Sold Out Players
//       </button>
//       <div className="table-responsive">
//         <table className="sold-out-players-table">
//           <thead>
//             <tr>
//               <th>Sr No</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Position</th>
//               <th>Sold Out Price (₹)</th>
//               <th>Selected Team</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {soldOutPlayers.map((player, index) => (
//               <tr key={player.id}>
//                 <td>{index + 1}</td>
//                 <td>{player.fullName}</td>
//                 <td>{player.age}</td>
//                 <td>{player.position}</td>
//                 <td>{player.soldOutPrice}</td>
//                 <td>{player.selectedTeam}</td>
//                 <td className="status">Sold</td>
//                 <td>
//                   <button
//                     onClick={() => handleSendMessage(player)}
//                     className="admin-send-message-button"
//                   >
//                     Send Message
//                   </button>
//                   <button
//                     onClick={() => handleDeletePlayer(player.id)}
//                     className="admin-delete-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
