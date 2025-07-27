import React from 'react';

const EventCard = ({ event, onBook }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md" data-testid={`event-card-${event.id}`}>
      <h3 className="text-lg font-semibold">{event.name}</h3>
      <p>{event.address}</p>
      <p>{event.city}, {event.state}</p>
      <p>Rating: {event.rating}</p>
      <button 
        onClick={onBook}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        data-testid={`book-button-${event.id}`}
      >
        Book FREE Event
      </button>
    </div>
  );
};

export default EventCard;