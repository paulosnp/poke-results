import { PokemonData } from '../types/pokemon';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(idOrName: string | number): Promise<PokemonData> {
  const query = typeof idOrName === 'string' ? idOrName.toLowerCase().trim() : idOrName;
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${query}`);
  if (!res.ok) {
    throw new Error(`Pokemon not found: ${idOrName}`);
  }
  return res.json();
}

/**
 * Returns the generation number of a Pokemon based on its ID.
 */
export function getPokemonGeneration(id: number): number {
  if (id <= 0) return 0;
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 898) return 8;
  if (id <= 1025) return 9;
  return 10; // Gen 10 or custom/future
}
