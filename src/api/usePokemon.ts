import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from './pokemonService';

export function usePokemon(idOrName: string | number) {
  return useQuery({
    queryKey: ['pokemon', idOrName],
    queryFn: () => fetchPokemon(idOrName),
    enabled: !!idOrName,
    staleTime: 1000 * 60 * 60 * 24, // Cache aggressively for 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep in garbage collector for 7 days
  });
}
