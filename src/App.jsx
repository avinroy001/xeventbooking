import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SearchResults from './SearchResults';
import MyBookings from './MyBookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path='/my-bookings' element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;