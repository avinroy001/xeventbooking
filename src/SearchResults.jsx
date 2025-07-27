import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';


const SearchResults = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get('state');
  const city = queryParams.get('city');

  useEffect(() => {
    fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [state, city]);

  const handleBooking = (event) => {
    const booking = {
      name: event.event_name,
      city: event.city,
      state: event.state,
      date: new Date().toISOString().split('T')[0],
      time: 'Morning',
    };
    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    alert('Event Booked');
  };

  return (
    <div>
      <Navbar/>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{events.length} events available in {city}</h1>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{event.event_name}</h3>
              <p>{event.address}, {event.city}, {event.state}</p>
              <p>Rating: {event.rating}</p>
              <button
                onClick={() => handleBooking(event)}
                className="bg-green-500 mt-2 text-white px-3 py-1 rounded">
                Book FREE Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;