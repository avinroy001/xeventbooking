import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">EventFinder</h2>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/search">Find Events</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>
    </nav>
  );
};

export default Navbar;