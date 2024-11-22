import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/webpack";

// Set worker source directly from a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pdfUrl, file } = location.state || {};
  const [extractedText, setExtractedText] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (file) {
      extractTextFromPDF(file);
    }
  }, [file]);

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          text += `${pageText}\n\n`; // Add page content with double line break
        }

        // Split text into paragraphs by empty lines
        const paragraphs = text
          .split("\n\n") // Split by double line breaks
          .map((paragraph) => paragraph.trim()) // Trim spaces
          .filter((paragraph) => paragraph.length > 0); // Remove empty paragraphs

        setExtractedText(paragraphs); // Save paragraphs as an array
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        setExtractedText(["Failed to extract text from the PDF."]);
      } finally {
        setLoading(false);
      }
    };

    fileReader.onerror = () => {
      console.error("Failed to read the file.");
      setExtractedText(["Failed to read the PDF file."]);
      setLoading(false);
    };

    fileReader.readAsArrayBuffer(file);
  };

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700">No PDF file provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 mb-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">PDF Viewer</h1>

      {/* Full Page PDF Viewer */}
      <iframe
        src={pdfUrl}
        type="application/pdf"
        className="w-full mb-6 border rounded-md"
        style={{ height: "80vh", width: "200vh" }} // Full-page height
        title="PDF Viewer"
      />

      {/* Display extracted text */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Extracted Text</h2>
        {loading ? (
          <p className="text-gray-500">Extracting text, please wait...</p>
        ) : (
          <div
            className="bg-gray-100 p-4 rounded-md overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {extractedText.map((paragraph, index) => (
              <p key={index} className="text-sm text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
