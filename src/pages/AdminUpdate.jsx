// import React, { useState } from "react";
// import "./AdminDesign/AdminUpdate.css";

// export const AdminUpdate = () => {
//   const [update, setUpdate] = useState("");
//   const [updates, setUpdates] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (update) {
//       setUpdates([...updates, update]);
//       setUpdate(""); // Clear input field after submission
//     }
//   };

//   const handleDelete = (index) => {
//     setUpdates(updates.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="addupdate-section">
//       <h1>Add Match Update</h1>
//       <div className="add-update">
//         <form className="update-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Add MLP Update"
//             value={update}
//             onChange={(e) => setUpdate(e.target.value)}
//           />
//           <button type="submit">Add Update</button>
//         </form>
//       </div>
//       <div className="updates-list">
//         {updates.map((update, index) => (
//           <div className="update-item" key={index}>
//             <p>{update}</p>
//             <button onClick={() => handleDelete(index)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
