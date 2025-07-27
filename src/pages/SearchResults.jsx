import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/EventCard';

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = params.get('state');
  const city = params.get('city');

  useEffect(() => {
    if (state && city) {
      axios
        .get(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then((res) => setEvents(res.data));
    }
  }, [state, city]);

  useEffect(() => {
    if (selectedDate) {
      // Generate dummy time slots
      setTimeSlots(['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate]);

  const openBooking = (event) => {
    setSelectedEvent(event);
    setShowBooking(true);
    setSelectedDate('');
    setTimeSlots([]);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSelectedEvent(null);
  };

  const handleBook = (slot) => {
    const newBooking = {
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      date: selectedDate,
      time: slot,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));
      alert('Event booked successfully!');
      closeBooking();
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Error booking event. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{events.length} events available in {city}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onBook={() => openBooking(event)} />
        ))}
      </div>

      {/* Booking Modal - appears on same page */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book: {selectedEvent?.name}</h2>
              <button onClick={closeBooking} className="text-2xl">&times;</button>
            </div>
            
            <p>{selectedEvent?.address}</p>
            <p>{selectedEvent?.city}, {selectedEvent?.state}</p>
            <p>Rating: {selectedEvent?.rating}</p>

            {/* Time of day indicators - appear in modal */}
            <div className="mt-4" data-testid="time-of-day-indicators">
              <p>Today</p>
              <p>Morning</p>
              <p>Afternoon</p>
              <p>Evening</p>
            </div>

            <div className="mt-4">
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
                className="border p-2 rounded w-full"
              />
            </div>

            {selectedDate && (
              <div className="mt-4">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;