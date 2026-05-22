import React from 'react';
import { Footer } from '../../components/Footer';

interface GameLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function GameLayout({ children, header }: GameLayoutProps) {
  return (
    <div className="h-full bg-slate-950 text-slate-50 flex flex-col items-center pt-4 sm:pt-8 pb-4 px-4 relative overflow-hidden font-sans">
      {/* Premium ambient light filters */}
      <div className="absolute top-[-25%] left-[-25%] w-[70%] h-[70%] rounded-full bg-pokemon-red/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-25%] right-[-25%] w-[70%] h-[70%] rounded-full bg-pokemon-blue/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10 flex flex-col items-center flex-grow overflow-hidden min-h-0">
        {/* Render header */}
        <header className="text-center mb-4 sm:mb-6 flex flex-col items-center shrink-0">
          {header}
        </header>

        {/* Render children/main contents */}
        <main className="w-full flex flex-col items-center flex-grow overflow-y-auto pr-1 min-h-0">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
