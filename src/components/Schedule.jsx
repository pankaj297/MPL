import React from "react";
import "./design/Schedule.css";

export const Schedule = () => {
 const matches = [
   // Day 1
   {
     id: 1,
     day: 1,
     date: "7/01/2025",
     teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
     teamB: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
   },
   {
     id: 2,
     day: 1,
     date: "7/01/2025",
     teamA: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
     teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
   },
   {
     id: 3,
     day: 1,
     date: "7/01/2025",
     teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
     teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
   },

   // Day 2
   {
     id: 4,
     day: 2,
     date: "8/01/2025",
     teamA: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
     teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
   },
   {
     id: 5,
     day: 2,
     date: "8/01/2025",
     teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
     teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
   },
   {
     id: 6,
     day: 2,
     date: "8/01/2025",
     teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
     teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
   },

   // Day 3

   {
     id: 7,
     day: 3,
     date: "9/01/2025",
     teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
     teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
   },

   {
     id: 8,
     day: 3,
     date: "9/01/2025",
     teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
     teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
   },
   {
     id: 9,
     day: 3,
     date: "9/01/2025",
     teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
     teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
   },

   // Day 4

   {
     id: 10,
     day: 4,
     date: "10/01/2025",
     teamA: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
     teamB: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
   },
   {
     id: 11,
     day: 4,
     date: "10/01/2025",
     teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
     teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
   },
   {
     id: 12,
     day: 4,
     date: "10/01/2025",
     teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
     teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
   },

   // Day 5

   {
     id: 13,
     day: 5,
     date: "11/01/2025",
     teamA: { name: "Malkheda Panthers", logo: "./images/logo4.jpeg" },
     teamB: { name: "Vishwanath Warriors", logo: "./images/logo2.jpeg" },
   },
   {
     id: 14,
     day: 5,
     date: "11/01/2025",
     teamA: { name: "Shree Yodha", logo: "./images/logo5.jpeg" },
     teamB: { name: "Vishnu Blaster", logo: "./images/logo6.jpeg" },
   },
   {
     id: 15,
     day: 5,
     date: "11/01/2025",
     teamA: { name: "Dipak Warriors", logo: "./images/logo3.jpg" },
     teamB: { name: "Jagan Super Strikers", logo: "./images/logo7.jpeg" },
   },
   // Semi Final
   {
     id: 10,
     day: 6,
     date: "12/01/2025",
     teamA: { name: "Semi 1", logo: "./images/logo1.png" },
     teamB: { name: "Semi 4", logo: "./images/logo1.png" },
   },
   {
     id: 11,
     day: 6,
     date: "12/01/2025",
     teamA: { name: "Semi 2", logo: "./images/logo1.png" },
     teamB: { name: "Semi 3", logo: "./images/logo1.png" },
   },
   // Semi Final Lost
   {
     id: 12,
     day: 7,
     date: "13/01/2025",
     teamA: { name: "Semi Lost 1", logo: "./images/logo1.png" },
     teamB: { name: "Semi Lost 2", logo: "./images/logo1.png" },
   },
   //Final
   {
     id: 12,
     day: 8,
     date: "14/01/2025",
     teamA: { name: "Finalist 1", logo: "./images/logo1.png" },
     teamB: { name: "Finalist 2", logo: "./images/logo1.png" },
   },
 ];

 return (
   <div className="schedule-container">
     <h2>MPL Schedule Upcoming Cricket Matches</h2>
     <div className="matchess">
       {matches.map((match) => (
         <div key={match.id} className="match-cards">
           <div className="match-infos">
             <span className="match-day">
               Day {match.day} Match {match.id}
             </span>
           </div>
           <div className="team">
             <img src={match.teamA.logo} alt={`${match.teamA.name} logo`} />
             <span>{match.teamA.name}</span>
           </div>
           <span className="vs">VS</span>
           <div className="team">
             <img src={match.teamB.logo} alt={`${match.teamB.name} logo`} />
             <span>{match.teamB.name}</span>
           </div>
           <p className="hello">
               Date : {match.date}
           </p>
         </div>
       ))}
     </div>
   </div>
 );
};


