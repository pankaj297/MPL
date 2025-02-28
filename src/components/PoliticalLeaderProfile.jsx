// // src/PoliticalLeaderProfile.jsx
// import React from "react";
// import "./design/PoliticalLeaderProfile.css"; // Ensure this path is correct

// const leaders = [
//   {
//     id: 1,
//     profileImg: "./images/baban.jpeg",
//     backgroundImg: "./images/g3.jpg",
//     name: "Baban Naik",
//     title: "Position in Party",
//     spendMoney: "500,000",
//     about:
//       "Leader One is known for their strong policies on economic development and dedication to improving social welfare.",
//     achievements: [
//       "Launched a successful education reform",
//       "Increased public healthcare funding by 30%",
//       "Led environmental protection initiatives",
//     ],
//   },
//   {
//     id: 2,
//     profileImg: "./images/baban.jpeg",
//     backgroundImg: "./images/g1.jpg",
//     name: "Baban Naik",
//     title: "Position in Party",
//     spendMoney: "500,000",
//     about:
//       "Leader One is known for their strong policies on economic development and dedication to improving social welfare.",
//     achievements: [
//       "Launched a successful education reform",
//       "Increased public healthcare funding by 30%",
//       "Led environmental protection initiatives",
//     ],
//   },
// ];

// export const PoliticalLeaderProfile = () => {
//   return (
//     <div className="leader-section">
//       {leaders.map((leader) => (
//         <div key={leader.id} className="profile-container">
//           <div
//             className="profile-background"
//             style={{ backgroundImage: `url(${leader.backgroundImg})` }}
//           >
//             <img
//               src={leader.profileImg}
//               alt={leader.name}
//               className="profile-image"
//             />
//           </div>
//           <div className="profile-details">
//             <h2 className="profile-name">{leader.name}</h2>
//             <p className="profile-title">{leader.title}</p>
//             <p className="profile-spend">
//               <strong>Spending Focus:</strong> ${leader.spendMoney}
//             </p>
//             <p className="profile-about">About: {leader.about}</p>
//             <div className="profile-achievements">
//               <h3 className="achievements-title">Achievements</h3>
//               <ul className="achievements-list">
//                 {leader.achievements.map((achievement, index) => (
//                   <li key={index} className="achievement-item">
//                     {achievement}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
