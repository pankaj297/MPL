import React, { useState, useEffect } from "react";
import styles from "./AdminDesign/PlayerTable.module.css";

export const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedAadhar, setSelectedAadhar] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [checkedStatus, setCheckedStatus] = useState(
    JSON.parse(localStorage.getItem("checkedStatus")) || {}
  );

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://mpl-backend-5gc6.onrender.com/api/user/allUsers"
        );
        const data = await response.json();

        if (data.success) {
          setPlayers(data.user);
        } else {
          console.error("API returned unsuccessful response:", data);
        }
      } catch (error) {
        console.error("Error fetching players data:", error);
      }
    };

    fetchPlayers();
  }, []);

  const totalPlayers = players.length;
  const totalPaid = totalPlayers * 200;
  const totalBatsman = players.filter(
    (player) => player.position === "batsman"
  ).length;
  const totalAllrounder = players.filter(
    (player) => player.position === "allrounder"
  ).length;

  const totalBowler = players.filter(
    (player) => player.position === "bowler"
  ).length;

  const totalWicketkeeper = players.filter(
    (player) => player.position === "keeperBatsman"
  ).length;

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
                .tableInfoData{
            margin: 1rem;
            padding: 1rem;
            display: flex;
           flex-direction: column;
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
            }
          </style>
        </head>
        <body>
          <h2>MPL Registered Players</h2>
           <div class="tableInfoData">
        <p>Total Players : ${totalPlayers}</p>
        <p>Total Money : ${totalPaid}</p>
        <p>Total Batsman : ${totalBatsman}</p>
        <p>Total Allrounder : ${totalAllrounder}</p>
        <p>Total Bowler : ${totalBowler}</p>
        <p>Total Wicketkeeper : ${totalWicketkeeper}</p>
      </div>
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
                  (player, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${player.name}</td>
                  <td>${player.mobile}</td>
                  <td>${player.age}</td>
                  <td>${player.position}</td>
                  <td>${200 || "N/A"}</td>
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
    let message = `From Malkheda Primer League Author\nHello, ${player.name}!\n`;

    if (messageType === "success") {
      message += `Here are your details:\nMobile: ${player.mobile}\nAge: ${
        player.age
      }\nPosition: ${player.position}\nTransaction ID: ${
        player.transactionId
      }\nPayment: ${
        player.payment || "Pending"
      } Successfully Paid!\nThank you for participating in MPL!`;
    } else {
      message += `Unfortunately, your transaction with ID '${player.transactionId}' was not successful.\nPlease contact MPL authors to resolve this problem.\nMPL Authors Contact: 7276746341\nThank you!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${player.mobile}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://mpl-backend-5gc6.onrender.com/api/user/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player._id !== id)
        );
        alert("Player deleted successfully!");
      } else {
        console.error("Failed to delete player:", response);
        alert("Failed to delete player. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("An error occurred while deleting the player. Please try again.");
    }
  };

  return (
    <div className={styles["player-table"]}>
      <h2>MPL Registered Players</h2>

      <button
        onClick={handlePrint}
        style={{ marginBottom: "10px", float: "left" }}
      >
        Print All Players
      </button>
      <div className={styles.tableInfoData}>
        <p>Total Players : {totalPlayers}</p>
        <p>Total Money : {totalPaid}</p>
        <p>Total Batsman : {totalBatsman}</p>
        <p>Total Allrounder : {totalAllrounder}</p>
        <p>Total Bowler : {totalBowler}</p>
        <p>Total Wicketkeeper : {totalWicketkeeper}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sir No</th>
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
          {players.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  checked={checkedStatus[player._id] || false}
                  onChange={() => handleCheckboxChange(player._id)}
                />
              </td>
              <td>{player.name}</td>
              <td>{player.mobile}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>
                <img
                  src={player.passPhoto}
                  alt={player.name}
                  className={styles["profile-img"]}
                  onClick={() =>
                    handleImageClick(player.passPhoto, setSelectedImg)
                  }
                />
              </td>
              <td>
                <img
                  src={player.aadhar}
                  alt="Aadhar Card"
                  className={styles["aadhar-img"]}
                  onClick={() =>
                    handleImageClick(player.aadhar, setSelectedAadhar)
                  }
                />
              </td>
              <td>{player.transactionId}</td>
              <td>
                <img
                  src={player.transactionPhoto}
                  alt="Transaction"
                  className={styles["transaction-img"]}
                  onClick={() =>
                    handleImageClick(
                      player.transactionPhoto,
                      setSelectedTransaction
                    )
                  }
                />
              </td>
              <td>{200 || "N/A"}</td>
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
                <button onClick={() => handleDelete(player._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedImg && (
        <div className={styles.modal} onClick={() => setSelectedImg(null)}>
          <img
            src={selectedImg}
            alt="Profile"
            className={styles["modal-img"]}
          />
        </div>
      )}

      {selectedAadhar && (
        <div className={styles.modal} onClick={() => setSelectedAadhar(null)}>
          <img
            src={selectedAadhar}
            alt="Aadhar Card"
            className={styles["modal-img"]}
          />
        </div>
      )}

      {selectedTransaction && (
        <div
          className={styles.modal}
          onClick={() => setSelectedTransaction(null)}
        >
          <img
            src={selectedTransaction}
            alt="Transaction"
            className={styles["modal-img"]}
          />
        </div>
      )}
    </div>
  );
};
