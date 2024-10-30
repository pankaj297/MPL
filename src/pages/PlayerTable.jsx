import React, { useState } from "react";
import "./AdminDesign/PlayerTable.css";

const demoPlayers = [
  {
    id: 1,
    fullName: "Virat Kohli",
    mobileNum: "7249766875",
    age: 35,
    position: "Batsman",
    profileImg: "./images/virat-kohli.jpg",
    aadharImg: "./images/pankajadhaar.jpeg",
    transactionId: "T2410242055356649283753",
    transactionImg: "./images/trasationphoto.jpeg",
    payment: "₹200",
  },
  {
    id: 2,
    fullName: "Baban Ratilal Naik",
    mobileNum: "7276746341",
    age: 20,
    position: "All Rounder",
    profileImg: "./images/baban.jpeg",
    aadharImg: "./images/pankajadhaar.jpeg",
    transactionId: "T2410241227175209280316",
    transactionImg: "./images/trasationphoto.jpeg",
    payment: "₹200",
  },
  {
    id: 3,
    fullName: "Pankaj Suklal Naik",
    mobileNum: "7249766875",
    age: 21,
    position: "Batsman",
    profileImg: "./images/pankaj.jpeg",
    aadharImg: "./images/pankajadhaar.jpeg",
    transactionId: "T2410241227175209280316",
    transactionImg: "./images/trasationphoto.jpeg",
    payment: "₹200",
  },
  {
    id: 4,
    fullName: "Akash Ramesh Naik",
    mobileNum: "9359294532",
    age: 21,
    position: "Wicket Keeper Batsman",
    profileImg: "./images/ak.enc",
    aadharImg: "./images/pankajadhaar.jpeg",
    transactionId: "T2410241227175209280316",
    transactionImg: "./images/trasationphoto.jpeg",
    payment: "₹200",
  },
  // ...additional player data
];

export const PlayerTable = () => {
  const [players, setPlayers] = useState(demoPlayers);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedAadhar, setSelectedAadhar] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [checkedStatus, setCheckedStatus] = useState(
    JSON.parse(localStorage.getItem("checkedStatus")) || {}
  );

  const handleCheckboxChange = (id) => {
    setCheckedStatus((prevState) => {
      const newStatus = { ...prevState, [id]: !prevState[id] };
      localStorage.setItem("checkedStatus", JSON.stringify(newStatus));
      return newStatus;
    });
  };

  const handleImageClick = (image, setImage) => {
    setImage(image);
  };

  const handlePrint = () => {
    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>MPL Players Details</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border: 1px solid #ddd; }
            th { background-color: #3498db; color: white; }
            .author { position: absolute; bottom: 10px; right: 10px; font-size: 15px; color: #666; }
          </style>
        </head>
        <body>
          <h2>MPL Registered Players</h2>
          <table>
            <thead>
              <tr>
                <th>Sir No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Position</th>
                <th>Payment</th>
                <th>Select Team Name</th>
              </tr>
            </thead>
            <tbody>
              ${players
                .map(
                  (player) => `
                <tr>
                  <td>${player.id}</td>
                  <td>${player.fullName}</td>
                  <td>${player.mobileNum}</td>
                  <td>${player.age}</td>
                  <td>${player.position}</td>
                  <td>${player.payment}</td>
                  <td></td>
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
    newWindow.print();
  };

  const sendWhatsAppMessage = (player, messageType) => {
  let message = `From Malkheda Primer League Author\nHello, ${player.fullName}!\n`;
  
  if (messageType === "success") {
    message += `Here are your details:\nMobile: ${player.mobileNum}\nAge: ${player.age}\nPosition: ${player.position}\nTransaction ID: ${player.transactionId}\nPayment: ${player.payment} Successfully Paid! \nThank you for participating in MPL !! `;
  } else {
    message += `Unfortunately, \nyour transaction with ID ' ${player.transactionId} ' was not successful.  \nPlease contact MPL authors for resolve this problem.\nMPL Authors Contact : 7276746341 \nThank you !!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${player.mobileNum}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};



  const handleDelete = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="player-table">
      <h2>MPL Registered Players</h2>

      <button
        onClick={handlePrint}
        style={{ marginBottom: "10px", float: "left" }}
      >
        Print All Players
      </button>

      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Position</th>
            <th>Profile Image</th>
            <th>Aadhar Card</th>
            <th>Transaction ID</th>
            <th>Transaction Image</th>
            <th>Payment</th>
            <th>Successfully</th>
            <th>Failed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} id={`player-${player.id}`}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedStatus[player.id] || false}
                  onChange={() => handleCheckboxChange(player.id)}
                />
              </td>
              <td>{player.fullName}</td>
              <td>{player.mobileNum}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>
                <img
                  src={player.profileImg}
                  alt={player.fullName}
                  className="profile-img"
                  onClick={() =>
                    handleImageClick(player.profileImg, setSelectedImg)
                  }
                />
              </td>
              <td>
                <img
                  src={player.aadharImg}
                  alt="Aadhar Card"
                  className="aadhar-img"
                  onClick={() =>
                    handleImageClick(player.aadharImg, setSelectedAadhar)
                  }
                />
              </td>
              <td>{player.transactionId}</td>
              <td>
                <img
                  src={player.transactionImg}
                  alt="Transaction"
                  className="transaction-img"
                  onClick={() =>
                    handleImageClick(
                      player.transactionImg,
                      setSelectedTransaction
                    )
                  }
                />
              </td>
              <td>{player.payment}</td>
              <td>
                <button onClick={() => sendWhatsAppMessage(player, "success")}>
                  Send
                </button>
              </td>
              <td>
                <button onClick={() => sendWhatsAppMessage(player, "failure")}>
                  Failed
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Profile" className="modal-img" />
        </div>
      )}

      {selectedAadhar && (
        <div className="modal" onClick={() => setSelectedAadhar(null)}>
          <img src={selectedAadhar} alt="Aadhar" className="modal-img" />
        </div>
      )}

      {selectedTransaction && (
        <div className="modal" onClick={() => setSelectedTransaction(null)}>
          <img
            src={selectedTransaction}
            alt="Transaction"
            className="modal-img"
          />
        </div>
      )}
    </div>
  );
};





