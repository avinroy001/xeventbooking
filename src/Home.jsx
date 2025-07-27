import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://eventdata.onrender.com/states')
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(data => setCities(data));
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id="state">
            <label className="block mb-1">State</label>
            <select
              className="border p-2 w-full"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}>
              <option value="">Select State</option>
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          <div id="city">
            <label className="block mb-1">City</label>
            <select
              className="border p-2 w-full"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}>
              <option value="">Select City</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>

          <button type="submit" id="searchBtn" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
