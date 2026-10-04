# Data sources and scope

The committed `src/data/pokemon/pokemon.json` snapshot is derived from `@pkmn/dex` 0.10.11, upstream https://github.com/pkmn/ps, which unifies Pokémon Showdown data layers. The package is locked in package-lock.json and used only by the generation script, not shipped as a runtime dependency in the browser.

Run `npm run data:generate` to reproduce the snapshot. Review the generated diff, then run all checks. The snapshot contains 1,025 base species, English names, types, generation and six base stats from the Generation 9 Dex. Regional/alternate forms, Mega evolutions, move sets, items, abilities and competitive legality are outside this phase.

The initial format is an explicitly **casual National Dex planning pool**, not an official or Showdown competitive format. Earlier species marked Past in the Gen 9 game are deliberately retained. Do not use this pool to assert Scarlet/Violet availability, VGC legality, tier bans or current metagame performance.

The upstream code/data package is MIT-licensed. See THIRD_PARTY_NOTICES.md for the license notice. Pokémon names and intellectual property remain with their owners; this notice does not grant rights to official artwork. This project currently uses CSS/letter placeholders and bundles no Pokémon sprites or official art.
