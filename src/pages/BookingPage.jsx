import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    axios.get(`https://eventdata.onrender.com/events`).then((res) => {
      const ev = res.data.find(e => e.id == eventId);
      setEvent(ev);
    });
  }, [eventId]);

  useEffect(() => {
    if (selectedDate) {
      // Generate dummy time slots
      setTimeSlots(['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']);
    }
  }, [selectedDate]);

  const handleBook = (slot) => {
    const newBooking = {
      eventId,
      eventName: event?.name,
      date: selectedDate,
      time: slot,
    };

    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));
    alert('Event booked successfully!');
  };

  return (
    <div className="p-6">
      {event ? (
        <>
          <h2 className="text-2xl mb-4">Book Event: {event.name}</h2>
          <p>{event.address}, {event.city}</p>
          <p>Rating: {event.rating}</p>

          {/* ALWAYS show time of day indicators on booking page */}
          <div className="mt-6">
            <p>Today</p>
            <p>Morning</p>
            <p>Afternoon</p>
            <p>Evening</p>
          </div>

          <div className="mt-6">
            <label className="block mb-2">Select Date (within 7 days)</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0]
              }
              className="border p-2 rounded"
            />
          </div>

          {selectedDate && (
            <div className="mt-6">
              <p className="mb-2">Available Time Slots:</p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleBook(slot)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookingPage;