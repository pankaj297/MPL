import React, { useState } from "react";
import "./design/Registration.css";
import axios from "axios";
import { toast } from "react-toastify";

export const CricketPlayerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    address: "",
    position: "",
    passPhoto: null,
    aadhar: null,
    transactionId: "",
    transactionPhoto: null,
  });

  const handleChange = (e) => {
    // const { name, value, files } = e.target;
    // if (files) {
    //   setFormData({ ...formData, [name]: files[0] });
    // } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("mobile", formData.mobile);
    data.append("age", formData.age);
    data.append("position", formData.position);
    data.append("transactionId", formData.transactionId);
    data.append("aadhar", formData.aadhar);
    data.append("passPhoto", formData.passPhoto);
    data.append("transactionPhoto", formData.transactionPhoto);

    console.log("Form submitted:", formData);
    try {
      const result = await axios.post(
        "https://mpl-backend-5gc6.onrender.com/api/user/adduser",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      console.log("err occured", error);
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="registration-section">
          <div className="registration-container">
            <div className="important-notes">
              <h4 className="heading-notes">Read The Important notes</h4>
              <p>1. All details provided will be verified and recorded.</p>
              <p>
                2. Ensure Transaction id , payment recept photo add correct{" "}
              </p>
              <p>
                3. Required to fill the all information otherwise not accept you
                Registration
              </p>
              <p>
                4. Ensure the Transaction id , payment recept photo Transaction
                id are match{" "}
              </p>
              <p>
                5. After Registration within 24 hours MPL Authors send massage
                on your mobile numbers for conform seat{" "}
              </p>
              <p>
                6. When you not comfort table with online payment you can pay
                offline also{" "}
              </p>
              <p>
                7. For Offline payment you meet MPL Author ' Baban Naik ' with
                your Aadhaar card{" "}
              </p>
              <p>8. Watch the following video for payment</p>
              <video
                src="./images/video1.mp4"
                width={"300px"}
                loop
                muted
                playsInline
                controls
              ></video>
            </div>
            <h2>Cricket Player Registration</h2>
            <div className="scan-img">
              <img src="./images/scanner.jpeg" alt="Scanner" width={"200px"} />
              <p>Registration Fees:100/-</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="fullName"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobileNo"
                  value={formData.mobile}
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
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="Allrounder">Allrounder</option>
                  <option value="Keeper-batsman">Keeper-Batsman</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="passportPhoto">Upload Passport Photo</label>
                <input
                  type="file"
                  name="passPhoto"
                  id="passportPhoto"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="aadharCard">Upload Aadhar Card</label>
                <input
                  type="file"
                  name="aadhar"
                  id="aadharCard"
                  onChange={handleFileChange}
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
                  onChange={handleFileChange}
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
