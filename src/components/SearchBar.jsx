import React, { useState } from 'react';
import searchIcon from '../assets/icons/searchIcon.png';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be implemented later
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Location..."
        className="w-[320px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 pr-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-all"
      >
        <img src={searchIcon} alt="Search" className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
