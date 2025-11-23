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
  const totalPaid = totalPlayers * 300;
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
    const newWindow = window.open("", "", "width=800,height=800");
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
            .author {
              position: fixed;
              bottom: 0;
              right: 0;
              font-size: 15px;
              color: #666;
              width: 100%;
              text-align: center;
              background: white;
              padding: 5px 3px;
            }
            @media print {
              .author {
                position: fixed;
                bottom: 0;
                right: 0;
                width: 100%;
                text-align: center;
                background: white;
                padding: 5px 0;
              }
            }
            .tableInfoData {
              margin: 1rem;
              padding: 1rem;
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 0.5rem;
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
                  <td>300</td>
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

  // Clean mobile and add +91 if needed
  const buildWhatsappNumber = (mobile) => {
    if (!mobile) return "";
    let num = String(mobile).replace(/\D/g, ""); // keep digits only
    if (num.length === 10) {
      num = "91" + num;
    } else if (num.length === 11 && num.startsWith("0")) {
      num = "91" + num.slice(1);
    }
    return num;
  };

  const sendWhatsAppMessage = (player, messageType) => {
    const phone = buildWhatsappNumber(player.mobile);
    if (!phone) {
      alert("Invalid mobile number for WhatsApp.");
      return;
    }

    let message = `मालखेडा प्रीमियर लीग लेखकाकडून\nनमस्कार, ${player.name}!\n`;

    if (messageType === "success") {
      message += `तुमची माहिती खालीलप्रमाणे आहे:\nमोबाईल: ${
        player.mobile
      }\nवय: ${player.age}\nस्थान: ${player.position}\nTransaction ID: ${
        player.transactionId
      }\nपेमेंट: ${
        player.payment || "300₹"
      } ✓ यशस्वीरित्या पूर्ण!\nमालखेडा प्रीमियर लीगमध्ये सहभागी झाल्याबद्दल धन्यवाद!`;
    } else {
      message += `दुर्दैवाने, तुमचा व्यवहार (Transaction ID) '${player.transactionId}' यशस्वी झालेला नाही.\nकृपया ही समस्या सोडवण्यासाठी MPL आयोजकांशी संपर्क साधा.\nMPL आयोजक संपर्क: 7276746341\nधन्यवाद!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );
    if (!confirmed) return;

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
        const data = await response.json().catch(() => null);
        console.error("Failed to delete player:", response.status, data);
        alert("Failed to delete player. Please check backend route / logs.");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("An error occurred while deleting the player. Please try again.");
    }
  };

  return (
    <div className={styles.playerTable}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>MPL Registered Players</h2>
        <button className={styles.primaryButton} onClick={handlePrint}>
          Print All Players
        </button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>Total Players: {totalPlayers}</div>
        <div className={styles.statItem}>Total Money: ₹{totalPaid}</div>
        <div className={styles.statItem}>Batsman: {totalBatsman}</div>
        <div className={styles.statItem}>Allrounder: {totalAllrounder}</div>
        <div className={styles.statItem}>Bowler: {totalBowler}</div>
        <div className={styles.statItem}>Wicketkeeper: {totalWicketkeeper}</div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Check</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Position</th>
              <th>Profile Image</th>
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
                    className={styles.profileImg}
                    onClick={() =>
                      handleImageClick(player.passPhoto, setSelectedImg)
                    }
                  />
                </td>
                <td>{player.transactionId}</td>
                <td>
                  <img
                    src={player.transactionPhoto}
                    alt="Transaction"
                    className={styles.transactionImg}
                    onClick={() =>
                      handleImageClick(
                        player.transactionPhoto,
                        setSelectedTransaction
                      )
                    }
                  />
                </td>
                <td>300</td>
                <td>
                  <button
                    className={styles.successBtn}
                    onClick={() => sendWhatsAppMessage(player, "success")}
                  >
                    Send
                  </button>
                </td>
                <td>
                  <button
                    className={styles.failBtn}
                    onClick={() => sendWhatsAppMessage(player, "failure")}
                  >
                    Failed
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(player._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImg && (
        <div className={styles.modal} onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Profile" className={styles.modalImg} />
        </div>
      )}

      {selectedAadhar && (
        <div className={styles.modal} onClick={() => setSelectedAadhar(null)}>
          <img
            src={selectedAadhar}
            alt="Aadhar Card"
            className={styles.modalImg}
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
            className={styles.modalImg}
          />
        </div>
      )}
    </div>
  );
};
