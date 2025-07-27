import React, { useEffect, useState } from 'react';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = () => {
      try {
        const data = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(data);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setBookings([]);
      }
    };
    loadBookings();
  }, []);

  const renderBookings = () => {
    if (bookings.length === 0) {
      return <p>No bookings found.</p>;
    }

    return (
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 data-testid={`booking-event-name-${index}`}>{booking.eventName}</h3>
            <p>Date: {booking.date || booking.bookingDate}</p>
            <p>Time: {booking.time || booking.bookingTime}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">My Bookings</h1>
      {renderBookings()}
    </div>
  );
};

export default MyBookingsPage;