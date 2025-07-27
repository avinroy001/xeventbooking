import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://eventdata.onrender.com/states').then((res) => {
      setStates(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then((res) => {
          setCities(res.data);
          setSelectedCity('');
        });
    }
  }, [selectedState]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setShowStateDropdown(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div id="state" className="relative">
        <label className="block mb-1">Select State</label>
        <div 
          className="w-full p-2 border rounded bg-white cursor-pointer"
          onClick={() => setShowStateDropdown(!showStateDropdown)}
        >
          {selectedState || '-- Select State --'}
        </div>
        {showStateDropdown && (
          <ul className="absolute z-10 w-full border rounded bg-white max-h-40 overflow-y-auto">
            {states.map((state) => (
              <li 
                key={state} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleStateSelect(state)}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div id="city" className="relative">
        <label className="block mb-1">Select City</label>
        <div 
          className={`w-full p-2 border rounded bg-white cursor-pointer ${!selectedState ? 'opacity-50' : ''}`}
          onClick={() => selectedState && setShowCityDropdown(!showCityDropdown)}
        >
          {selectedCity || '-- Select City --'}
        </div>
        {showCityDropdown && selectedState && (
          <ul className="absolute z-10 w-full border rounded bg-white max-h-40 overflow-y-auto">
            {cities.map((city) => (
              <li 
                key={city} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        id="searchBtn"
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={!selectedState || !selectedCity}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;