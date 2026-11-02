import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Catering from './components/Catering';
import VisitUs from './components/VisitUs';

export default function App({ path = '/' }: { path?: string }) {
  const currentView = path.replace(/\/$/, '').slice(1) || 'home';

  return (
    <div className="bg-noise min-h-screen flex flex-col">
      <Navbar
        currentView={currentView}
      />

      <div className="flex-1 min-w-0 pt-20 md:pt-24">
        {currentView === 'home' ? (
          <Home />
        ) : currentView === 'catering' ? (
          <Catering />
        ) : currentView === 'location' ? (
          <main><VisitUs standalone /></main>
        ) : currentView === 'menu' ? (
          <Menu />
        ) : (
          <main className="px-6 py-20 text-center"><h1 className="font-display text-5xl">Page not found</h1><a href="/" className="inline-block underline mt-6">Return to Lavash</a></main>
        )}
      </div>
    </div>
  );
}
