Event Booking Application

A React-based web application for finding and booking events across the USA.

🚀 Features

Find Events: Search events by state and city
Event Booking: Book appointments with date and time selection
My Bookings: View and manage your event bookings
Data Persistence: Bookings saved in localStorage
Responsive Design: Mobile-friendly interface
 🛠️ Tech Stack

React.js
React Router
Tailwind CSS
Axios for API integration
 📋 Requirements

Node.js (v14 or higher)
npm or yarn
 🚀 Getting Started

bash


1
2
3
4
5
6
7
8
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
📱 Pages

Home Page - Search events by state and city
Search Results - View available events
Booking Page - Select date and time slots
My Bookings - View your booked events
 🔧 API Endpoints

States: https://eventdata.onrender.com/states
Cities: https://eventdata.onrender.com/cities/:state
Events: https://eventdata.onrender.com/events?state=:state&city=:city
 📦 Key Components

SearchForm - State/city selection with dropdowns
EventCard - Event display with booking option
BookingForm - Date/time selection interface
MyBookings - Bookings display with localStorage persistence
 ✅ Testing

Application passes all Cypress end-to-end tests and unit tests.

🎨 Design

Follows Figma design specifications with responsive layout and Swiper carousel integration.