import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './Screens/Pdf';
import View from './Screens/View';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
