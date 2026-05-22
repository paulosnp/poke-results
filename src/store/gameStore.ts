import { create } from 'zustand';
import { PokemonData } from '../types/pokemon';
import { GuessResult } from '../types/game';
import { fetchPokemon } from '../api/pokemonService';
import { comparePokemonAttributes } from '../features/game/gameLogic';

interface GameState {
  targetPokemon: PokemonData | null;
  guesses: GuessResult[];
  status: 'playing' | 'won' | 'lost';
  isLoading: boolean;
  error: string | null;
  maxGuesses: number;
  
  initGame: (targetId?: number) => Promise<void>;
  submitGuess: (pokemonName: string) => Promise<void>;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  targetPokemon: null,
  guesses: [],
  status: 'playing',
  isLoading: false,
  error: null,
  maxGuesses: 8,

  initGame: async (targetId) => {
    set({ isLoading: true, error: null, guesses: [], status: 'playing' });
    try {
      // Pick a random ID between 1 and 1025 if not provided
      const id = targetId || Math.floor(Math.random() * 1025) + 1;
      const target = await fetchPokemon(id);
      set({ targetPokemon: target, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  submitGuess: async (pokemonName) => {
    const { targetPokemon, guesses, maxGuesses, status } = get();
    if (!targetPokemon || status !== 'playing') return;

    set({ isLoading: true, error: null });
    try {
      const guessedPokemon = await fetchPokemon(pokemonName);
      
      // Check if already guessed
      const isAlreadyGuessed = guesses.some((g) => g.pokemon.id === guessedPokemon.id);
      if (isAlreadyGuessed) {
        throw new Error('Você já palpitou esse Pokémon!');
      }

      const result = comparePokemonAttributes(guessedPokemon, targetPokemon);
      const updatedGuesses = [...guesses, result];
      
      let nextStatus: 'playing' | 'won' | 'lost' = 'playing';
      if (result.isCorrect) {
        nextStatus = 'won';
      } else if (updatedGuesses.length >= maxGuesses) {
        nextStatus = 'lost';
      }

      set({
        guesses: updatedGuesses,
        status: nextStatus,
        isLoading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  resetGame: () => {
    set({
      targetPokemon: null,
      guesses: [],
      status: 'playing',
      error: null,
      isLoading: false,
    });
  },
}));
