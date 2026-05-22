import React, { useState, useEffect, useRef } from 'react';
import { POKEMON_LIST, PokemonNameItem } from '../../../utils/pokemonList';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

interface GuessInputProps {
  onGuess: (name: string) => void;
  disabled?: boolean;
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PokemonNameItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = POKEMON_LIST.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        selectSuggestion(suggestions[selectedIndex].name);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectSuggestion = (name: string) => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    onGuess(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exactMatch = POKEMON_LIST.find(
      (p) => p.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (exactMatch) {
      selectSuggestion(exactMatch.name);
    } else if (suggestions.length > 0) {
      selectSuggestion(suggestions[0].name);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder="Adivinhe o Pokémon..."
            disabled={disabled}
            className="lowercase font-medium"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="autocomplete-list"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-option-${selectedIndex}` : undefined}
          />
          
          {isOpen && suggestions.length > 0 && (
            <ul 
              id="autocomplete-list"
              role="listbox"
              className="absolute z-50 w-full mt-2 rounded-2xl glass border border-slate-800/80 shadow-2xl overflow-hidden py-1.5"
            >
              {suggestions.map((item, idx) => (
                <li
                  key={item.id}
                  id={`suggestion-option-${idx}`}
                  onClick={() => selectSuggestion(item.name)}
                  role="option"
                  aria-selected={idx === selectedIndex}
                  className={`px-4 py-2.5 text-sm cursor-pointer capitalize font-semibold transition-colors duration-150 flex items-center justify-between ${
                    idx === selectedIndex
                      ? 'bg-pokemon-blue/15 text-pokemon-blue'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-slate-500 font-bold">
                    #{String(item.id).padStart(3, '0')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button type="submit" disabled={disabled || !query.trim()}>
          Palpite
        </Button>
      </form>
    </div>
  );
}
