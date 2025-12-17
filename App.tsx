import React from 'react';
import { Header } from './components/Header';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col overflow-x-hidden">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <Header onGeneratorClick={() => {}} />
      
      <main className="flex-grow flex flex-col relative z-10 pt-20">
        <Generator />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;