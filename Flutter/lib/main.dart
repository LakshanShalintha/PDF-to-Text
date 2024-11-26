import 'package:flutter/material.dart';
import 'PDFUpload.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PDF Text Extractor',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: PDFUpload(),
    );
  }
}
