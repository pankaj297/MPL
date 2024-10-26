import React, { useState } from "react";
import "./design/Registration.css";


export const CricketPlayerRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    age: "",
    address: "",
    position: "",
    passportPhoto: null,
    aadharCard: null,
    transactionId: "",
    transactionPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    };
    


    return (
      <>
        <div className="register-page">
          <div className="registration-section">
            <div className="registration-container">
              <h2>Cricket Player Registration</h2>
              <div className="scan-img">
                <img
                  src="./images/scanner.jpeg"
                  alt="Scanner"
                  width={"200px"}
                />
                <p>Registration Fees:100/-</p>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobileNo">Mobile No</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    id="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <select
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="batsman">Batsman</option>
                    <option value="bowler">Bowler</option>
                    <option value="allrounder">Allrounder</option>
                    <option value="keeperBatsman">Keeper-Batsman</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="passportPhoto">Upload Passport Photo</label>
                  <input
                    type="file"
                    name="passportPhoto"
                    id="passportPhoto"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="aadharCard">Upload Aadhar Card</label>
                  <input
                    type="file"
                    name="aadharCard"
                    id="aadharCard"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionId">Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    id="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionPhoto">
                    Upload Transaction Photo
                  </label>
                  <input
                    type="file"
                    name="transactionPhoto"
                    id="transactionPhoto"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};
