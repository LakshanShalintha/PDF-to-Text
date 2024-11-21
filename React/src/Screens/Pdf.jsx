import React from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      navigate("/view", { state: { file: uploadedFile } });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUploadClick = () => {
    document.querySelector('input[type="file"]').click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Upload PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleUploadClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Upload PDF
      </button>
    </div>
  );
}

export default Upload;
