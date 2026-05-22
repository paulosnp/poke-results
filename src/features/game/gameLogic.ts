import { PokemonData } from '../../types/pokemon';
import { GuessResult } from '../../types/game';
import { getPokemonGeneration } from '../../api/pokemonService';

export function comparePokemonAttributes(
  guessed: PokemonData,
  target: PokemonData
): GuessResult {
  const isCorrect = guessed.id === target.id;

  // Compare types
  const guessedTypes = guessed.types.map((t) => t.type.name);
  const targetTypes = target.types.map((t) => t.type.name);
  
  const commonTypes = guessedTypes.filter((t) => targetTypes.includes(t));
  let typeMatchVal: 'correct' | 'partial' | 'incorrect' = 'incorrect';
  
  if (
    guessedTypes.length === targetTypes.length && 
    commonTypes.length === guessedTypes.length
  ) {
    typeMatchVal = 'correct';
  } else if (commonTypes.length > 0) {
    typeMatchVal = 'partial';
  }

  // Compare weights (higher means target is heavier, lower means target is lighter)
  let weightMatchVal: 'correct' | 'higher' | 'lower' = 'correct';
  if (guessed.weight < target.weight) {
    weightMatchVal = 'higher';
  } else if (guessed.weight > target.weight) {
    weightMatchVal = 'lower';
  }

  // Compare heights (higher means target is taller, lower means target is shorter)
  let heightMatchVal: 'correct' | 'higher' | 'lower' = 'correct';
  if (guessed.height < target.height) {
    heightMatchVal = 'higher';
  } else if (guessed.height > target.height) {
    heightMatchVal = 'lower';
  }

  // Compare generations (higher means target is later, lower means target is earlier)
  const guessedGen = getPokemonGeneration(guessed.id);
  const targetGen = getPokemonGeneration(target.id);
  let genMatchVal: 'correct' | 'higher' | 'lower' = 'correct';
  if (guessedGen < targetGen) {
    genMatchVal = 'higher';
  } else if (guessedGen > targetGen) {
    genMatchVal = 'lower';
  }

  return {
    pokemon: guessed,
    isCorrect,
    typeMatch: {
      value: guessedTypes,
      match: typeMatchVal,
    },
    weightMatch: {
      value: guessed.weight,
      match: weightMatchVal,
    },
    heightMatch: {
      value: guessed.height,
      match: heightMatchVal,
    },
    generationMatch: {
      value: guessedGen,
      match: genMatchVal,
    },
  };
}
