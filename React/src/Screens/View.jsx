import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source directly from a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

function View() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      await extractTextFromPDF(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += `Page ${i}:\n${pageText}\n\n`;
      }

      console.log("Extracted Text:", text);
      setExtractedText(text);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Upload PDF</h1>
      <input
        id="fileInput"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Upload File
      </button>
      {selectedFile && (
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            <strong>Selected File:</strong> {selectedFile.name}
          </p>
          <embed
            src={URL.createObjectURL(selectedFile)}
            type="application/pdf"
            className="mt-4 border rounded-md"
            style={{ width: "600px", height: "500px" }}
          />
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-3xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Extracted Text</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">
              {extractedText || "Extracting text..."}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
