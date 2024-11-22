import React from "react";
import { useNavigate } from "react-router-dom";

function Pdf() {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const pdfUrl = URL.createObjectURL(file); // Create a Blob URL for the PDF

      // Navigate to the View page with the PDF URL and file
      navigate("/view", {
        state: {
          pdfUrl,
          file, // Pass the file to process in the View page
        },
      });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Upload PDF</h1>
      <input
        id="fileInput"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
    </div>
  );
}

export default Pdf;
