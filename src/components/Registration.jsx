import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./design/Registration.css";

export const CricketPlayerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    position: "",
    passPhoto: null,
    transactionId: "",
    transactionPhoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    age: "",
    position: "",
    passPhoto: "",
    transactionId: "",
    transactionPhoto: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    // Validate file size (less than 200KB)
    if (file.size > 200 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "File size must be less than 200KB.",
      }));
    } else {
      setFormData({ ...formData, [name]: file });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  
const validateForm = () => {
  let valid = true;
  let tempErrors = { ...errors };

  if (!formData.name.trim()) {
    tempErrors.name = "Name is required.";
    valid = false;
  }
  if (!formData.mobile.match(/^\d{10}$/)) {
    tempErrors.mobile = "Mobile number must be 10 digits.";
    valid = false;
  } else {
    tempErrors.mobile = " ";
  }
  if (formData.age <= 0 || formData.age > 100) {
    tempErrors.age = "Please enter a valid age.";
    valid = false;
  } else {
    tempErrors.age = " ";
  }
  if (!formData.position) {
    tempErrors.position = "Position is required.";
    valid = false;
  }
  if (!formData.passPhoto) {
    tempErrors.passPhoto = "Passport photo is required.";
    valid = false;
  } else {
    const fileType = formData.passPhoto.type?.toLowerCase();
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(fileType)) {
      tempErrors.passPhoto = "Only jpg, jpeg, png, and webp images are allowed.";
      valid = false;
    }
  }
  if (!formData.transactionId.trim()) {
    tempErrors.transactionId = "Transaction ID is required.";
    valid = false;
  }
  if (!formData.transactionPhoto) {
    tempErrors.transactionPhoto = "Transaction photo is required.";
    valid = false;
  } else {
    const fileType = formData.transactionPhoto.type?.toLowerCase();
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(fileType)) {
      tempErrors.transactionPhoto = "Only jpg, jpeg, png, and webp images are allowed.";
      valid = false;
    }
  }

  setErrors(tempErrors);
  return valid;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("mobile", formData.mobile);
    data.append("age", formData.age);
    data.append("position", formData.position);
    data.append("transactionId", formData.transactionId);
    data.append("passPhoto", formData.passPhoto);
    data.append("transactionPhoto", formData.transactionPhoto);

    try {
      const result = await axios.post(
        "https://mpl-backend-5gc6.onrender.com/api/user/adduser",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(result.data.message);
      setFormData({
        name: "",
        mobile: "",
        age: "",
        position: "",
        passPhoto: null,
        transactionId: "",
        transactionPhoto: null,
      });
      document.getElementById("passportPhoto").value = "";
      document.getElementById("transactionPhoto").value = "";
      setErrors({
        name: "",
        mobile: "",
        age: "",
        position: "",
        passPhoto: "",
        transactionId: "",
        transactionPhoto: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="registration-section">
        <div className="registration-container">
          <div className="important-notes">
            <h4 className="heading-notes">खालील माहिती काळजीपूर्वक वाचा</h4>
            <p>
              1. तुमच्याकडून दिलेली सर्व माहिती पडताळून घेतली जाईल आणि नोंद केली
              जाईल.
            </p>
            <p>
              2. व्यवहार आयडी (Transaction ID) आणि पेमेंट पावतीचा फोटो अचूक आहे
              याची खात्री करा.
            </p>
            <p>
              3. सर्व आवश्यक माहिती भरणे अनिवार्य आहे; अन्यथा तुमची नोंदणी
              स्वीकारली जाणार नाही.
            </p>
            <p>
              4. व्यवहार आयडी आणि पेमेंट पावतीवर दिलेला आयडी जुळत आहे याची
              पडताळणी करा.
            </p>
            <p>
              5. नोंदणी केल्यानंतर, 24 तासांच्या आत MPL लेखक तुमच्या मोबाईल
              क्रमांकावर सीट निश्चितीचा संदेश पाठवतील.
            </p>
            <p>
              6. तुम्हाला ऑनलाइन पेमेंटमध्ये अडचण असल्यास, तुम्ही ऑफलाइन
              पद्धतीने पेमेंट करू शकता.
            </p>
            <p>
              7. ऑफलाइन पेमेंटसाठी MPL लेखक बबन नाईक यांची भेट घ्या आणि तुमचा
              आधार कार्ड सोबत ठेवा.
            </p>
            <p>
              8. पेमेंट कसे करावे हे जाणून घेण्यासाठी खाली दिलेला व्हिडिओ पाहा.
            </p>
            <p className="video-link">
              <a
                href="https://youtube.com/shorts/4dAZ0ua4P3U?si=cReXjfz1MRaJwJH-"
                target="_blank"
              >
                Watch Video
              </a>
            </p>
            <p>खालील वेबसाइटचा वापर करून 200KB च्या आत फोटो अपलोड करा.</p>
            <p>
              <a
                className="kb-btn"
                href="https://image.pi7.org/reduce-image-size-in-kb"
                target="_blank"
              >
                वेबसाइट 200kb
              </a>
            </p>
          </div>
          <h2>Cricket Player Registration</h2>
          <div className="scan-img">
            <img
              src="./images/vivek_scanner.jpeg"
              alt="Scanner"
              width={"200px"}
            />
            <p>Registration Fees: 200₹</p>
            {/* <h2>🚫Registration End ‼️</h2> */}
          </div>
          {/* onSubmit={handleSubmit} */}
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
              {errors.name && <span className="error">{errors.name}</span>}
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
              {errors.mobile && <span className="error">{errors.mobile}</span>}
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
              {errors.age && <span className="error">{errors.age}</span>}
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
              {errors.position && (
                <span className="error">{errors.position}</span>
              )}
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
              {errors.passPhoto && (
                <span className="error">{errors.passPhoto}</span>
              )}
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
              {errors.transactionId && (
                <span className="error">{errors.transactionId}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="transactionPhoto">Upload Transaction Photo</label>
              <input
                type="file"
                name="transactionPhoto"
                id="transactionPhoto"
                onChange={handleFileChange}
                required
              />
              {errors.transactionPhoto && (
                <span className="error">{errors.transactionPhoto}</span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

