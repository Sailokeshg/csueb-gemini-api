import React from 'react';

const Header = () => (
  <header className="bg-gray-800 text-white py-4">
    <div className="header-content flex items-center justify-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/CSUEB.svg/800px-CSUEB.svg.png"
        alt="CSUEB Logo"
        className="logo w-12 h-12 mr-4"
      />
      <h1 className="text-xl font-bold">California State University, East Bay</h1>
    </div>
  </header>
);

export default Header;