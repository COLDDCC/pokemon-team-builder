export const featuredPokemonIds = ['pikachu', 'charizard', 'garchomp', 'gengar', 'dragonite', 'lucario'] as const;
export const indexablePaths = ['/', '/pokemon', '/weakness-calculator', '/type-coverage', '/games/gen-9-national-dex', ...featuredPokemonIds.flatMap(id => [`/pokemon/${id}`, `/pokemon/${id}/best-teammates`])];
