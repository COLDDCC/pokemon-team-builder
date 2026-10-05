# Data sources and scope

The committed `src/data/pokemon/pokemon.json` snapshot is derived from `@pkmn/dex` 0.10.11, upstream https://github.com/pkmn/ps, which unifies Pokémon Showdown data layers. The package is locked in package-lock.json and used only by the generation script, not shipped as a runtime dependency in the browser.

Run `npm run data:generate` to reproduce the snapshot. Review the generated diff, then run all checks. The snapshot contains 1,025 base species, English names, types, generation and six base stats from the Generation 9 Dex. Regional/alternate forms, Mega evolutions, move sets, items, abilities and competitive legality are outside this phase.

The initial format is an explicitly **casual National Dex planning pool**, not an official or Showdown competitive format. Earlier species marked Past in the Gen 9 game are deliberately retained. Do not use this pool to assert Scarlet/Violet availability, VGC legality, tier bans or current metagame performance.

The upstream code/data package is MIT-licensed. See THIRD_PARTY_NOTICES.md for the license notice. Pokémon names and intellectual property remain with their owners; this notice does not grant rights to official artwork. Images are referenced from the pinned upstream CDN; no Pokémon image binaries are bundled.

The generated type-chart.json stores all 324 Generation 9 standard matchups from the same pinned Dex source. Rows are attackers and columns are defenders; dual types multiply. Stellar and battle mechanics are excluded.

## Pokémon sprites
The shared PokemonSprite component loads the 475×475 official-artwork PNG images from PokeAPI/sprites at commit a3a1432e688ea028f12c51371d5253037cb9f17b via jsDelivr, keyed by National Pokédex number. Team cards, search results and recommendations use the same source, fixed image dimensions and lazy loading outside selected team cards. A failed request falls back to the Pokédex number while the name and type badges stay visible.
Source: https://github.com/PokeAPI/sprites
License statement: https://github.com/PokeAPI/sprites/blob/a3a1432e688ea028f12c51371d5253037cb9f17b/LICENCE.txt
The repository states CC0 1.0 Universal and explicitly reserves image copyright to The Pokémon Company. This project claims no ownership or official endorsement of Pokémon imagery. CDN availability is required to display sprites; scoring and selection remain local.

## Official type symbols
The 18 SVG files in public/type-icons are original assets downloaded from the official Japanese Pokémon Pokédex, https://zukan.pokemon.co.jp/img/icon_type_1.svg through icon_type_18.svg. The mapping was verified against https://zukan.pokemon.co.jp/zukan-api/api/masters/ and the site's CSS/search implementation on 2026-10-05. Order: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy. SVG bytes are preserved; no competitor or fan redraw is used. Pokémon assets remain the property of their respective owners; attribution is not a license grant or endorsement.
