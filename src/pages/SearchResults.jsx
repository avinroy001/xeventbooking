import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/EventCard';

const SearchResults = () => {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{events.length} events available in {city}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;