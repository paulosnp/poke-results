import { motion, AnimatePresence } from 'framer-motion';
import { GuessResult } from '../../../types/game';

interface GuessDisplayProps {
  guesses: GuessResult[];
}

export function GuessDisplay({ guesses }: GuessDisplayProps) {
  const getMatchStyles = (match: 'correct' | 'incorrect' | 'higher' | 'lower' | 'partial') => {
    switch (match) {
      case 'correct':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35 hover:bg-emerald-500/25';
      case 'partial':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/35 hover:bg-amber-500/25';
      default:
        return 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-900/80';
    }
  };

  const getTooltipText = (match: 'correct' | 'incorrect' | 'higher' | 'lower' | 'partial', name: string) => {
    switch (match) {
      case 'correct':
        return `Correto! O ${name} coincide.`;
      case 'partial':
        return `Parcial! Pelo menos um tipo coincide.`;
      case 'higher':
        return `O Pokémon oculto possui ${name} maior.`;
      case 'lower':
        return `O Pokémon oculto possui ${name} menor.`;
      default:
        return `Incorreto. ${name} diferente.`;
    }
  };

  return (
    <section className="w-full mt-2" role="table" aria-label="Histórico de Palpites">
      <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 px-1">
        Histórico de Palpites
      </h3>
      
      {/* Column Labels */}
      <div className="grid grid-cols-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3" role="row">
        <div className="text-left" role="columnheader">Pokémon</div>
        <div role="columnheader">Tipos</div>
        <div role="columnheader">Peso</div>
        <div role="columnheader">Altura</div>
        <div role="columnheader">Geração</div>
      </div>

      <div className="flex flex-col gap-3" role="rowgroup">
        <AnimatePresence initial={false}>
          {[...guesses].reverse().map((g) => (
            <motion.div
              key={g.pokemon.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              role="row"
              className="grid grid-cols-5 items-center bg-slate-900/35 border border-slate-900 glass rounded-2xl p-3 text-center text-sm relative overflow-visible group hover:bg-slate-900/50 transition-all duration-200"
            >
              {/* Pokémon Column */}
              <div className="flex items-center gap-2.5 text-left col-span-1" role="cell">
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-0.5 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-inner">
                  <img 
                    src={g.pokemon.sprites.front_default || ''} 
                    alt={g.pokemon.name} 
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <span className="capitalize font-bold text-slate-200 text-xs truncate max-w-[80px]">
                  {g.pokemon.name}
                </span>
              </div>

              {/* Types Column */}
              <div className="relative group/cell" role="cell" aria-label={`Tipos: ${g.typeMatch.value.join(', ')}. ${getTooltipText(g.typeMatch.match, 'tipo')}`}>
                <div className={`mx-1 py-2.5 rounded-xl border text-[10px] font-black flex flex-col gap-0.5 items-center justify-center transition-all ${getMatchStyles(g.typeMatch.match)}`}>
                  {g.typeMatch.value.map(t => (
                    <span key={t} className="capitalize leading-tight">{t}</span>
                  ))}
                </div>
                {/* Custom Tooltip */}
                <div className="absolute hidden group-hover/cell:block bg-slate-950 border border-slate-800 text-[10px] text-slate-200 font-bold px-2.5 py-1.5 rounded-xl shadow-2xl -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                  {getTooltipText(g.typeMatch.match, 'tipo')}
                </div>
              </div>

              {/* Weight Column */}
              <div className="relative group/cell" role="cell" aria-label={`Peso: ${g.weightMatch.value / 10} kg. ${getTooltipText(g.weightMatch.match, 'peso')}`}>
                <div className={`mx-1 py-2.5 rounded-xl border font-bold flex flex-col items-center justify-center transition-all ${getMatchStyles(g.weightMatch.match)}`}>
                  <span className="text-xs font-bold">{g.weightMatch.value / 10} kg</span>
                  {g.weightMatch.match === 'higher' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▲</span>}
                  {g.weightMatch.match === 'lower' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▼</span>}
                </div>
                <div className="absolute hidden group-hover/cell:block bg-slate-950 border border-slate-800 text-[10px] text-slate-200 font-bold px-2.5 py-1.5 rounded-xl shadow-2xl -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                  {getTooltipText(g.weightMatch.match, 'peso')}
                </div>
              </div>

              {/* Height Column */}
              <div className="relative group/cell" role="cell" aria-label={`Altura: ${g.heightMatch.value / 10} m. ${getTooltipText(g.heightMatch.match, 'altura')}`}>
                <div className={`mx-1 py-2.5 rounded-xl border font-bold flex flex-col items-center justify-center transition-all ${getMatchStyles(g.heightMatch.match)}`}>
                  <span className="text-xs font-bold">{g.heightMatch.value / 10} m</span>
                  {g.heightMatch.match === 'higher' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▲</span>}
                  {g.heightMatch.match === 'lower' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▼</span>}
                </div>
                <div className="absolute hidden group-hover/cell:block bg-slate-950 border border-slate-800 text-[10px] text-slate-200 font-bold px-2.5 py-1.5 rounded-xl shadow-2xl -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                  {getTooltipText(g.heightMatch.match, 'altura')}
                </div>
              </div>

              {/* Generation Column */}
              <div className="relative group/cell" role="cell" aria-label={`Geração: ${g.generationMatch.value}ª. ${getTooltipText(g.generationMatch.match, 'geração')}`}>
                <div className={`mx-1 py-2.5 rounded-xl border font-bold flex flex-col items-center justify-center transition-all ${getMatchStyles(g.generationMatch.match)}`}>
                  <span className="text-xs font-bold">{g.generationMatch.value}ª</span>
                  {g.generationMatch.match === 'higher' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▲</span>}
                  {g.generationMatch.match === 'lower' && <span className="text-[10px] text-rose-400 font-black mt-0.5 animate-pulse">▼</span>}
                </div>
                <div className="absolute hidden group-hover/cell:block bg-slate-950 border border-slate-800 text-[10px] text-slate-200 font-bold px-2.5 py-1.5 rounded-xl shadow-2xl -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                  {getTooltipText(g.generationMatch.match, 'geração')}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
