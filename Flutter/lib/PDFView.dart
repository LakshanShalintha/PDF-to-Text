import 'package:flutter/material.dart';
import 'dart:io';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';

class PDFView extends StatefulWidget {
  final File file;

  const PDFView({Key? key, required this.file}) : super(key: key);

  @override
  _PDFViewState createState() => _PDFViewState();
}

class _PDFViewState extends State<PDFView> {
  String extractedText = "Loading...";

  @override
  void initState() {
    super.initState();
    extractTextFromPdf(widget.file);
  }

  Future<void> extractTextFromPdf(File file) async {
    try {
      // Load the PDF document
      final PdfDocument document = PdfDocument(inputBytes: await file.readAsBytes());

      // Extract text from the document
      String rawText = PdfTextExtractor(document).extractText();

      // Clean and format the text
      String cleanedText = cleanAndFormatText(rawText);

      setState(() {
        extractedText = cleanedText;
      });

      // Dispose of the document
      document.dispose();
    } catch (e) {
      setState(() {
        extractedText = "Failed to extract text. Error: $e";
      });
    }
  }

  String cleanAndFormatText(String text) {
    // Remove unnecessary symbols but retain newlines
    String cleanedText = text.replaceAll(RegExp(r'[^\w\s.,\n]'), ''); // Retain letters, numbers, spaces, periods, commas, and newlines

    // Normalize multiple consecutive line breaks into one
    cleanedText = cleanedText.replaceAll(RegExp(r'\n{2,}'), '\n\n');

    // Remove any leading or trailing spaces
    cleanedText = cleanedText.trim();

    return cleanedText;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('PDF Viewer')),
      body: Column(
        children: [
          // Display the PDF
          Expanded(
            flex: 2,
            child: SfPdfViewer.file(
              widget.file,
              onDocumentLoaded: (details) {
                print("PDF loaded successfully");
              },
              onDocumentLoadFailed: (PdfDocumentLoadFailedDetails details) {
                print("Failed to load PDF: ${details.error}");
              },
            ),
          ),
          // Display the extracted text
          Expanded(
            flex: 1,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                extractedText,
                style: const TextStyle(fontSize: 16),
                textAlign: TextAlign.left,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
