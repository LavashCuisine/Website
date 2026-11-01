import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Catering from './components/Catering';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="bg-noise min-h-screen flex flex-col">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="flex-1 min-w-0 pt-20 md:pt-24">
        {currentView === 'home' ? (
          <Home setCurrentView={setCurrentView} />
        ) : currentView === 'catering' ? (
          <Catering setCurrentView={setCurrentView} />
        ) : (
          <Menu setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  );
}
