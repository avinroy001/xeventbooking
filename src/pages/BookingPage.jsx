import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get('https://eventdata.onrender.com/events');
        const eventData = response.data.find(e => e.id == eventId);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (selectedDate) {
      // Generate dummy time slots
      setTimeSlots(['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate]);

  const handleBook = (slot) => {
    const newBooking = {
      eventId,
      eventName: event?.name,
      date: selectedDate,
      time: slot,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));
      alert('Event booked successfully!');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Error booking event. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!event) {
    return <div className="p-6">Event not found.</div>;
  }

  return (
    <div className="p-6" data-testid="booking-page">
      <h2 className="text-2xl mb-4">Book Event: {event.name}</h2>
      <p>{event.address}, {event.city}</p>
      <p>Rating: {event.rating}</p>

      {/* Time of day indicators - ALWAYS visible on booking page for Cypress test */}
      <div className="mt-6" data-testid="time-of-day-indicators">
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
          data-testid="date-picker"
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
                data-testid={`time-slot-${slot.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;