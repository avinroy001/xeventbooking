import React from 'react';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Find Events Near You</h1>
      <SearchForm />
    </div>
  );
};

export default Home;