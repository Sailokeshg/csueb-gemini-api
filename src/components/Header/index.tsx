import React from "react";

const Header = () => (
  <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
    <div className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/CSUEB.svg/800px-CSUEB.svg.png"
          alt="CSUEB Logo"
          className="w-14 h-14 rounded-full bg-white p-2 shadow-md"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wide">
            California State University, East Bay
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            AI-Powered Support Assistant
          </p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
