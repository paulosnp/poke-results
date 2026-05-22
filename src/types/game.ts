import { PokemonData } from './pokemon';

export interface PropertyMatch<T> {
  value: T;
  match: 'correct' | 'incorrect' | 'higher' | 'lower' | 'partial';
}

export interface GuessResult {
  pokemon: PokemonData;
  isCorrect: boolean;
  typeMatch: PropertyMatch<string[]>;
  weightMatch: PropertyMatch<number>;
  heightMatch: PropertyMatch<number>;
  generationMatch: PropertyMatch<number>;
}
