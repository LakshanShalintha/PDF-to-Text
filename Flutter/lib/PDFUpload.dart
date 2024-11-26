import 'package:flutter/material.dart';
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'PDFView.dart';

class PDFUpload extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Upload PDF')),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            FilePickerResult? result = await FilePicker.platform.pickFiles(
              type: FileType.custom,
              allowedExtensions: ['pdf'],
            );
            if (result != null) {
              File file = File(result.files.single.path!);
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => PDFView(file: file)),
              );
            }
          },
          child: Text('Select PDF'),
        ),
      ),
    );
  }
}
