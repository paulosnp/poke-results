import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGameStore } from './gameStore';
import { fetchPokemon } from '../api/pokemonService';
import { PokemonData } from '../types/pokemon';

// Mock the pokemonService
vi.mock('../api/pokemonService', () => ({
  fetchPokemon: vi.fn(),
  getPokemonGeneration: (id: number) => {
    if (id <= 151) return 1;
    return 2;
  },
}));

const mockBulbasaur: PokemonData = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    { slot: 1, type: { name: 'grass', url: '' } },
    { slot: 2, type: { name: 'poison', url: '' } },
  ],
  sprites: { front_default: 'bulbasaur.png' },
};

const mockCharmander: PokemonData = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  types: [
    { slot: 1, type: { name: 'fire', url: '' } },
  ],
  sprites: { front_default: 'charmander.png' },
};

describe('useGameStore zustand integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.getState().resetGame();
  });

  it('should initialize the game with a target pokemon', async () => {
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);

    await useGameStore.getState().initGame(1);

    const state = useGameStore.getState();
    expect(state.targetPokemon).toEqual(mockBulbasaur);
    expect(state.guesses).toEqual([]);
    expect(state.status).toBe('playing');
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(fetchPokemon).toHaveBeenCalledWith(1);
  });

  it('should handle errors during game initialization', async () => {
    const errorMsg = 'Failed to fetch Pokemon';
    vi.mocked(fetchPokemon).mockRejectedValueOnce(new Error(errorMsg));

    await useGameStore.getState().initGame(999);

    const state = useGameStore.getState();
    expect(state.targetPokemon).toBeNull();
    expect(state.error).toBe(errorMsg);
    expect(state.isLoading).toBe(false);
  });

  it('should submit a correct guess and win the game', async () => {
    // Setup target Pokemon
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);
    await useGameStore.getState().initGame(1);

    // Mock guess resolution with same Bulbasaur
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);
    await useGameStore.getState().submitGuess('bulbasaur');

    const state = useGameStore.getState();
    expect(state.status).toBe('won');
    expect(state.guesses).toHaveLength(1);
    expect(state.guesses[0].isCorrect).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should submit an incorrect guess and keep playing if under limit', async () => {
    // Setup target Pokemon
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);
    await useGameStore.getState().initGame(1);

    // Mock incorrect guess
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockCharmander);
    await useGameStore.getState().submitGuess('charmander');

    const state = useGameStore.getState();
    expect(state.status).toBe('playing');
    expect(state.guesses).toHaveLength(1);
    expect(state.guesses[0].isCorrect).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should transition to lost status when max guesses is reached', async () => {
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);
    await useGameStore.getState().initGame(1);

    // Set maxGuesses to 2 for easier testing
    useGameStore.setState({ maxGuesses: 2 });

    // 1st incorrect guess
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockCharmander);
    await useGameStore.getState().submitGuess('charmander');

    expect(useGameStore.getState().status).toBe('playing');

    // 2nd incorrect guess (using a different ID/name to prevent duplicate error)
    const mockSquirtle: PokemonData = {
      id: 7,
      name: 'squirtle',
      height: 5,
      weight: 90,
      types: [{ slot: 1, type: { name: 'water', url: '' } }],
      sprites: { front_default: 'squirtle.png' },
    };
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockSquirtle);
    await useGameStore.getState().submitGuess('squirtle');

    const state = useGameStore.getState();
    expect(state.status).toBe('lost');
    expect(state.guesses).toHaveLength(2);
  });

  it('should prevent duplicate guesses and store error', async () => {
    vi.mocked(fetchPokemon).mockResolvedValueOnce(mockBulbasaur);
    await useGameStore.getState().initGame(1);

    vi.mocked(fetchPokemon).mockResolvedValue(mockCharmander);

    // 1st guess
    await useGameStore.getState().submitGuess('charmander');
    expect(useGameStore.getState().error).toBeNull();

    // 2nd duplicate guess
    await useGameStore.getState().submitGuess('charmander');
    
    const state = useGameStore.getState();
    expect(state.guesses).toHaveLength(1); // Still 1 guess
    expect(state.error).toBe('Você já palpitou esse Pokémon!');
  });
});
