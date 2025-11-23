import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./design/Registration.module.css";

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

  // ---------- UPI / Payment config ----------
  const merchantVPA = "7276028036@ybl"; // your UPI ID
  const merchantName = "Pankaj Suklal Naik"; // payee name
  const registrationAmount = "3"; // as string
  const currency = "INR";
  const transactionNote = "MPL Registration Fee";

  // build UPI URI with a transaction reference
  const buildUpiUri = () => {
    const tr = `MPL-${Date.now()}`; // unique-ish transaction ref
    const params = new URLSearchParams({
      pa: merchantVPA,
      pn: merchantName,
      am: registrationAmount,
      cu: currency,
      tn: transactionNote,
      tr,
    });
    return `upi://pay?${params.toString()}`;
  };

  // one UPI URI for this render (used for QR & open link)
  const [upiUri] = useState(() => buildUpiUri());

  // QR image (auto-filled amount)
  const qrSize = 220;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
    upiUri
  )}`;

  // PhonePe static QR (put your image in public/images/phonepe_qr.png)
  const phonePeQrPublicPath = "/images/phonepe_qr.png";

  // Example screenshot path (replace with your own if needed)
  const exampleFailureScreenshot = "/images/upi_security_error_example.jpg";
  // ------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [name]: "File size must be less than 2MB.",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: file }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const tempErrors = {
      name: "",
      mobile: "",
      age: "",
      position: "",
      passPhoto: "",
      transactionId: "",
      transactionPhoto: "",
    };

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.mobile || "")) {
      tempErrors.mobile = "Mobile number must be 10 digits.";
      valid = false;
    }

    if (!formData.age || formData.age <= 0 || formData.age > 100) {
      tempErrors.age = "Please enter a valid age.";
      valid = false;
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
      if (
        !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          fileType
        )
      ) {
        tempErrors.passPhoto =
          "Only jpg, jpeg, png, and webp images are allowed.";
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
      if (
        !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          fileType
        )
      ) {
        tempErrors.transactionPhoto =
          "Only jpg, jpeg, png, and webp images are allowed.";
        valid = false;
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
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
      toast.success(result.data.message || "Registration submitted");

      setFormData({
        name: "",
        mobile: "",
        age: "",
        position: "",
        passPhoto: null,
        transactionId: "",
        transactionPhoto: null,
      });

      const passportEl = document.getElementById("passportPhoto");
      const transEl = document.getElementById("transactionPhoto");
      if (passportEl) passportEl.value = "";
      if (transEl) transEl.value = "";

      setErrors({
        name: "",
        mobile: "",
        age: "",
        position: "",
        passPhoto: "",
        transactionId: "",
        transactionPhoto: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // open UPI deep link
  const openUpiApp = () => {
    window.location.href = upiUri;
  };

  const copyUpiLink = async () => {
    try {
      await navigator.clipboard.writeText(upiUri);
      toast.success("UPI link copied to clipboard");
    } catch (e) {
      toast.error("Could not copy link");
    }
  };

  const copyVpa = async () => {
    try {
      await navigator.clipboard.writeText(merchantVPA);
      toast.success("VPA copied to clipboard");
    } catch (e) {
      toast.error("Could not copy VPA");
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registrationSection}>
        <div className={styles.container}>
          {/* Important Notes */}
          <div className={styles.importantNotes}>
            <div className={styles.notesHeader}>
              <h3>📋 Important Instructions</h3>
              <p>काळजीपूर्वक वाचा / Read Carefully</p>
            </div>
            <div className={styles.notesContent}>
              <div className={styles.noteItem}>
                <span className={styles.noteIcon}>✅</span>
                <p>तुमच्याकडून दिलेली सर्व माहिती पडताळून घेतली जाईल</p>
              </div>
              <div className={styles.noteItem}>
                <span className={styles.noteIcon}>✅</span>
                <p>
                  व्यवहार आयडी (Transaction ID) आणि पेमेंट पावतीचा फोटो अचूक आहे
                  याची खात्री करा
                </p>
              </div>
              <div className={styles.noteItem}>
                <span className={styles.noteIcon}>✅</span>
                <p>सर्व आवश्यक माहिती भरणे अनिवार्य आहे</p>
              </div>
            </div>
          </div>

          {/* Payment / QR area */}
          <div style={{ textAlign: "center", margin: 16 }}>
            <div style={{ display: "inline-block", textAlign: "center" }}>
              <img
                src={qrSrc}
                alt="UPI QR (prefill ₹)"
                width={qrSize}
                height={qrSize}
                style={{ display: "block", margin: "0 auto", borderRadius: 8 }}
              />
              <p style={{ marginTop: 8 }}>
                Auto-filled amount: <strong>₹{registrationAmount}</strong>
                <br />
                UPI ID: <strong>{merchantVPA}</strong>
              </p>
            </div>

            {/* <div style={{ marginTop: 12 }}>
              <button
                onClick={openUpiApp}
                className={styles.submitBtn}
                style={{ marginRight: 8 }}
              >
                Open UPI app (mobile)
              </button>
              <button
                onClick={copyVpa}
                className={styles.submitBtn}
                style={{ marginRight: 8 }}
              >
                Copy VPA
              </button>
              <button onClick={copyUpiLink} className={styles.submitBtn}>
                Copy UPI link
              </button>
            </div> */}

            {/* <p
              style={{
                color: "#555",
                fontSize: 13,
                maxWidth: 680,
                margin: "12px auto",
              }}
            >
              If your UPI app shows a message like{" "}
              <strong>
                "Your payment is declined for security reasons" / "same account"
              </strong>
              , it is a restriction by the bank / UPI app. In that case:
              <br />• Open your UPI app manually (GPay / PhonePe / Paytm)
              <br />• Choose "UPI ID" and enter <strong>{merchantVPA}</strong>
              <br />• Or choose "Scan QR" and scan the QR shown above
            </p> */}

            {/* PhonePe static QR (backup) */}
            {/* <div style={{ marginTop: 10 }}>
              <p style={{ marginBottom: 6 }}>
                PhonePe QR (scan from another phone):
              </p>
              <img
                src={phonePeQrPublicPath}
                alt="PhonePe QR"
                width={220}
                height={220}
                style={{ borderRadius: 8, display: "inline-block" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div> */}

            {/* Example screenshot of the app error (optional) */}
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 13, color: "#666" }}>
                Example: what some users may see inside their UPI app
              </p>
              <img
                src={exampleFailureScreenshot}
                alt="example failure"
                width={300}
                style={{
                  borderRadius: 6,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Registration form */}
          <div className={styles.registrationWrapper}>
            <div className={styles.paymentSection}>
              <div className={styles.paymentCard}>
                <h3>💰 Payment Information</h3>
                <div className={styles.paymentDetails}>
                  <p className={styles.note}>
                    After payment, paste Transaction ID / UTR and upload
                    screenshot below to complete registration.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2>🏏 Player Registration</h2>
                <p>Join Malkheda Premier League 2024</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      id="fullName"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? styles.errorInput : ""}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <span className={styles.errorText}>{errors.name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="mobileNo">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      id="mobileNo"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={errors.mobile ? styles.errorInput : ""}
                      placeholder="10-digit mobile number"
                    />
                    {errors.mobile && (
                      <span className={styles.errorText}>{errors.mobile}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={errors.age ? styles.errorInput : ""}
                      placeholder="Your age"
                      min="16"
                      max="60"
                    />
                    {errors.age && (
                      <span className={styles.errorText}>{errors.age}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="position">Playing Position *</label>
                    <select
                      name="position"
                      id="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={errors.position ? styles.errorInput : ""}
                    >
                      <option className={styles.option} value="">
                        Select your position
                      </option>
                      <option className={styles.option} value="batsman">
                        🏏 Batsman
                      </option>
                      <option className={styles.option} value="bowler">
                        🎯 Bowler
                      </option>
                      <option className={styles.option} value="allrounder">
                        🌟 All-rounder
                      </option>
                      <option className={styles.option} value="keeperBatsman">
                        🧤 Wicketkeeper-Batsman
                      </option>
                    </select>
                    {errors.position && (
                      <span className={styles.errorText}>
                        {errors.position}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="passportPhoto">Passport Photo *</label>
                    <div className={styles.fileInputWrapper}>
                      <input
                        type="file"
                        name="passPhoto"
                        id="passportPhoto"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                      />
                      <label
                        htmlFor="passportPhoto"
                        className={styles.fileLabel}
                      >
                        <span className={styles.fileIcon}>📷</span>
                        {formData.passPhoto
                          ? formData.passPhoto.name
                          : "Choose passport photo"}
                      </label>
                    </div>
                    {errors.passPhoto && (
                      <span className={styles.errorText}>
                        {errors.passPhoto}
                      </span>
                    )}
                    <p className={styles.fileHint}>Max 2MB • JPG, PNG, WebP</p>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="transactionId">Transaction ID *</label>
                    <input
                      type="text"
                      name="transactionId"
                      id="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      className={errors.transactionId ? styles.errorInput : ""}
                      placeholder="Enter UTR/Transaction ID"
                    />
                    {errors.transactionId && (
                      <span className={styles.errorText}>
                        {errors.transactionId}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="transactionPhoto">
                      Transaction Screenshot *
                    </label>
                    <div className={styles.fileInputWrapper}>
                      <input
                        type="file"
                        name="transactionPhoto"
                        id="transactionPhoto"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                      />
                      <label
                        htmlFor="transactionPhoto"
                        className={styles.fileLabel}
                      >
                        <span className={styles.fileIcon}>🧾</span>
                        {formData.transactionPhoto
                          ? formData.transactionPhoto.name
                          : "Choose transaction screenshot"}
                      </label>
                    </div>
                    {errors.transactionPhoto && (
                      <span className={styles.errorText}>
                        {errors.transactionPhoto}
                      </span>
                    )}
                    <p className={styles.fileHint}>Max 2MB • JPG, PNG, WebP</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`${styles.submitBtn} ${
                    loading ? styles.loading : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner}></span> Processing
                      Registration...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>

                <div className={styles.formFooter}>
                  <p>📞 Need help? Contact: +91 7276746341</p>
                  <p>📍 Offline payments also accepted</p>
                </div>
              </form>
            </div>
          </div>
          {/* end registration wrapper */}
        </div>
      </div>
    </div>
  );
};

export default CricketPlayerRegistration;
