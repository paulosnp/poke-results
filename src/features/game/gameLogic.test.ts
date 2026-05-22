import { describe, it, expect } from 'vitest';
import { comparePokemonAttributes } from './gameLogic';
import { PokemonData } from '../../types/pokemon';

const mockBulbasaur: PokemonData = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    { slot: 1, type: { name: 'grass', url: '' } },
    { slot: 2, type: { name: 'poison', url: '' } },
  ],
  sprites: { front_default: '' },
};

const mockVenusaur: PokemonData = {
  id: 3,
  name: 'venusaur',
  height: 20,
  weight: 1000,
  types: [
    { slot: 1, type: { name: 'grass', url: '' } },
    { slot: 2, type: { name: 'poison', url: '' } },
  ],
  sprites: { front_default: '' },
};

const mockCharmander: PokemonData = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  types: [
    { slot: 1, type: { name: 'fire', url: '' } },
  ],
  sprites: { front_default: '' },
};

describe('gameLogic attributes comparison', () => {
  it('correctly matches identical pokemon', () => {
    const res = comparePokemonAttributes(mockBulbasaur, mockBulbasaur);
    expect(res.isCorrect).toBe(true);
    expect(res.typeMatch.match).toBe('correct');
    expect(res.weightMatch.match).toBe('correct');
    expect(res.heightMatch.match).toBe('correct');
    expect(res.generationMatch.match).toBe('correct');
  });

  it('correctly compares same types, heavier weight and taller height', () => {
    const res = comparePokemonAttributes(mockBulbasaur, mockVenusaur);
    expect(res.isCorrect).toBe(false);
    expect(res.typeMatch.match).toBe('correct');
    expect(res.weightMatch.match).toBe('higher');
    expect(res.heightMatch.match).toBe('higher');
    expect(res.generationMatch.match).toBe('correct');
  });

  it('correctly compares incorrect types, lighter weight and shorter height', () => {
    const res = comparePokemonAttributes(mockVenusaur, mockCharmander);
    expect(res.isCorrect).toBe(false);
    expect(res.typeMatch.match).toBe('incorrect');
    expect(res.weightMatch.match).toBe('lower');
    expect(res.heightMatch.match).toBe('lower');
    expect(res.generationMatch.match).toBe('correct');
  });
});
