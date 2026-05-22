import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export function GameLayout({ children, header }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 px-4 relative overflow-y-auto overflow-x-hidden font-sans">
      {/* Premium ambient light filters */}
      <div className="absolute top-[-25%] left-[-25%] w-[70%] h-[70%] rounded-full bg-pokemon-red/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-25%] right-[-25%] w-[70%] h-[70%] rounded-full bg-pokemon-blue/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10 flex flex-col items-center">
        {/* Render header */}
        <header className="text-center mb-8 flex flex-col items-center">
          {header}
        </header>

        {/* Render children/main contents */}
        <main className="w-full flex flex-col items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
