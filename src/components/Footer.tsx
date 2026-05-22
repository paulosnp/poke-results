export function Footer() {
  return (
    <footer className="w-full max-w-2xl mt-4 pt-4 pb-1 border-t border-slate-900/60 text-center text-xs text-slate-500 font-medium tracking-wide flex flex-col sm:flex-row items-center justify-between gap-4 px-4 z-10">
      <p className="hover:text-slate-400 transition-colors duration-200">
        Dados fornecidos por{' '}
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pokemon-blue hover:text-sky-400 font-bold underline decoration-sky-500/35 decoration-2 underline-offset-4 transition-all duration-200"
        >
          PokeAPI
        </a>
      </p>
      <p className="hover:text-slate-400 transition-colors duration-200">
        Desenvolvido por{' '}
        <a
          href="https://github.com/paulosnp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pokemon-yellow hover:text-amber-400 font-bold underline decoration-amber-500/35 decoration-2 underline-offset-4 transition-all duration-200"
        >
          paulosnp
        </a>
      </p>
    </footer>
  );
}
