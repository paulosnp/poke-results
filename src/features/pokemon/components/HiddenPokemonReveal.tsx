import { motion } from 'framer-motion';
import { PokemonData } from '../../../types/pokemon';

interface HiddenPokemonRevealProps {
  pokemon: PokemonData;
  status: 'playing' | 'won' | 'lost';
}

export function HiddenPokemonReveal({ pokemon, status }: HiddenPokemonRevealProps) {
  const isRevealed = status !== 'playing';

  return (
    <div 
      className="flex flex-col items-center justify-center p-6 bg-slate-900/35 border border-slate-900 glass rounded-3xl relative overflow-hidden transition-all duration-300 w-full max-w-md shadow-2xl"
      aria-live="polite"
    >
      {/* Dynamic background pulse glow based on reveal state */}
      <div 
        className={`absolute inset-0 w-full h-full bg-gradient-to-b transition-opacity duration-1000 pointer-events-none ${
          isRevealed 
            ? 'from-pokemon-blue/15 to-transparent opacity-100' 
            : 'from-slate-900/10 to-transparent opacity-40'
        }`}
      />

      {/* Main Sprite container with glowing ring */}
      <div className="relative w-44 h-44 flex items-center justify-center bg-slate-950/65 rounded-full border border-slate-800/80 p-2 overflow-hidden shadow-inner group">
        <motion.div
          animate={isRevealed ? {
            boxShadow: '0 0 40px 10px rgba(42, 172, 223, 0.25)',
            borderColor: 'rgba(42, 172, 223, 0.4)'
          } : {}}
          className="absolute inset-0 rounded-full border border-transparent transition-all duration-1000"
        />

        <motion.img
          initial={{ filter: 'brightness(0) contrast(200)', scale: 0.85 }}
          animate={{
            filter: isRevealed ? 'none' : 'brightness(0) contrast(200)',
            scale: isRevealed ? 1.05 : 0.85,
            rotate: isRevealed ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || ''}
          alt={isRevealed ? `Arte oficial do Pokémon revelado: ${pokemon.name}` : 'Silhueta escura do Pokémon Oculto'}
          loading="lazy"
          className="w-36 h-36 object-contain z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Conditional Info Reveal */}
      <div className="text-center z-10 w-full mt-4">
        {isRevealed ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="bg-slate-800 text-pokemon-yellow text-[10px] font-bold px-3 py-1 rounded-full border border-slate-700 tracking-wider">
              Nº {String(pokemon.id).padStart(3, '0')}
            </span>
            <h2 className="text-3xl font-black capitalize tracking-wide text-slate-100 mt-2">
              {pokemon.name}
            </h2>
            
            {/* Pokemon Types */}
            <div className="flex gap-1.5 mt-3">
              {pokemon.types.map((t) => (
                <span 
                  key={t.type.name} 
                  className="capitalize text-xs font-bold px-3 py-1.5 rounded-lg text-slate-900 bg-gradient-to-r from-pokemon-yellow to-amber-400 shadow-md shadow-pokemon-yellow/10"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Extra details when revealed */}
            <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-5 border-t border-slate-800/80 text-center">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Peso</p>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">{pokemon.weight / 10} kg</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Altura</p>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">{pokemon.height / 10} m</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="text-slate-400 text-sm font-semibold animate-pulse tracking-wide mt-2">
            Quem é esse Pokémon?
          </p>
        )}
      </div>
    </div>
  );
}
