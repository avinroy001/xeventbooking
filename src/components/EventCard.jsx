import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md">
      <h3 className="text-lg font-semibold">{event.name}</h3>
      <p>{event.address}</p>
      <p>{event.city}, {event.state}</p>
      <p>Rating: {event.rating}</p>
      <Link to={`/book/${event.id}`}>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Book FREE Event
        </button>
      </Link>
    </div>
  );
};

export default EventCard;