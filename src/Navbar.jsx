import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">EventBooking</div>
      <div className="space-x-4">
        <Link to='/'>Find Events</Link>
        <Link to='/'>Venues</Link>
        <Link to='/'>Tickets</Link>
        <Link to='/my-bookings'>My Bookings</Link>
      </div>
    </nav>
  );
};

export default Navbar;