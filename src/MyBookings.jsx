import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(data);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{booking.name}</h3>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Location: {booking.city}, {booking.state}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
