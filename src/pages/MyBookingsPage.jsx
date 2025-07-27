import React, { useEffect, useState } from 'react';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{booking.eventName}</h3>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;