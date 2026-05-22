import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { GameLayout } from './features/game/GameLayout';
import { HiddenPokemonReveal } from './features/pokemon/components/HiddenPokemonReveal';
import { GuessInput } from './features/game/components/GuessInput';
import { GuessDisplay } from './features/game/components/GuessDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function App() {
  const {
    targetPokemon,
    guesses,
    status,
    isLoading,
    error,
    maxGuesses,
    initGame,
    submitGuess,
  } = useGameStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGuessSubmit = async (name: string) => {
    await submitGuess(name);
  };

  const gameHeader = (
    <>
      <div 
        onClick={() => status !== 'playing' && initGame()} 
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-pokemon-red via-pokemon-red to-red-400 p-1 flex items-center justify-center shadow-lg shadow-pokemon-red/35 cursor-pointer hover:rotate-12 transition-transform duration-300 ${status === 'playing' ? 'animate-bounce-slow' : ''}`}
      >
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-pokemon-red/90" />
          <div className="absolute bottom-0 w-full h-1/2 bg-slate-100" />
          <div className="absolute w-full h-1.5 bg-slate-950" />
          <div className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pokemon-red via-pokemon-yellow to-pokemon-blue bg-clip-text text-transparent mt-3 sm:mt-4">
        Poke Results
      </h1>
      <p className="text-slate-400 text-[10px] sm:text-xs mt-1 uppercase tracking-widest font-bold">
        Adivinhe o Pokémon Oculto
      </p>
    </>
  );

  return (
    <GameLayout header={gameHeader}>
      {/* Initial loading screen */}
      {isLoading && guesses.length === 0 && (
        <div className="glass rounded-3xl p-8 w-full max-w-md text-center flex flex-col items-center mb-6">
          <LoadingSpinner size="large" />
          <p className="text-slate-400 text-sm mt-2 animate-pulse">Sorteando Pokémon...</p>
        </div>
      )}

      {/* Global alert error message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-4 py-3 rounded-2xl w-full max-w-md text-center mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Target Pokemon Display (Silhouette / Revealed card) */}
      {targetPokemon && !isLoading && (
        <div className="w-full flex justify-center mb-8">
          <HiddenPokemonReveal pokemon={targetPokemon} status={status} onPlayAgain={() => initGame()} />
        </div>
      )}

      {/* Input panel when actively playing */}
      {targetPokemon && status === 'playing' && (
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tentativas: {guesses.length} / {maxGuesses}
            </span>
            {isLoading && (
              <span className="text-xs font-semibold text-pokemon-blue flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-pokemon-blue animate-ping" />
                Verificando...
              </span>
            )}
          </div>
          <GuessInput onGuess={handleGuessSubmit} disabled={isLoading} />
        </div>
      )}

      {/* Historic Guess Results list */}
      {guesses.length > 0 && (
        <div className="w-full">
          <GuessDisplay guesses={guesses} />
        </div>
      )}
    </GameLayout>
  );
}
