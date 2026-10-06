export interface PokemonGuide { role: string; item: string; ability: string; nature: string; moves: string[]; plan: string; caution: string; partners: string; alternative: string; alternativeReason: string; }
export const pokemonGuides: Record<string, PokemonGuide> = {
  "pikachu": {
    "role": "Fast special attacker",
    "item": "Light Ball",
    "ability": "Lightning Rod",
    "nature": "Timid",
    "moves": [
      "Thunderbolt",
      "Volt Switch",
      "Grass Knot",
      "Surf"
    ],
    "plan": "Light Ball doubles Pikachu’s Attack and Special Attack. Use Volt Switch to bring a teammate in after pressuring a favorable matchup.",
    "caution": "Its low bulk makes direct switches risky. Ground types block Electric attacks; coverage does not guarantee a safe matchup.",
    "partners": "A Flying teammate can cover Ground attacks; a bulky Water partner can absorb hits Pikachu cannot.",
    "alternative": "raichu",
    "alternativeReason": "Raichu offers more Speed and bulk, but cannot use Light Ball’s boost."
  },
  "charizard": {
    "role": "Special attacker and burn support",
    "item": "Heavy-Duty Boots",
    "ability": "Blaze",
    "nature": "Timid",
    "moves": [
      "Flamethrower",
      "Air Slash",
      "Dragon Pulse",
      "Will-O-Wisp"
    ],
    "plan": "Boots protect Charizard from entry hazards. Its Fire attacks pressure Steel types, while Will-O-Wisp can weaken physical attackers.",
    "caution": "Rock attacks deal 4× damage. Boots do not reduce direct Rock damage, and losing the item leaves it vulnerable to Stealth Rock.",
    "partners": "A Water or Ground partner can help against Rock types. Check that the rest of the team can handle Electric attackers.",
    "alternative": "arcanine",
    "alternativeReason": "Arcanine offers a different Fire role with Intimidate, without Charizard’s Ground immunity."
  },
  "garchomp": {
    "role": "Physical attacker with hazard support",
    "item": "Leftovers",
    "ability": "Rough Skin",
    "nature": "Jolly",
    "moves": [
      "Earthquake",
      "Dragon Claw",
      "Swords Dance",
      "Stealth Rock"
    ],
    "plan": "Choose between setting Stealth Rock and boosting with Swords Dance according to the matchup. Rough Skin punishes contact attacks.",
    "caution": "Ice attacks deal 4× damage. Fairy types are immune to Dragon Claw; Flying types avoid Earthquake.",
    "partners": "A Steel teammate can resist Ice, Dragon and Fairy attacks. A special attacker helps avoid relying entirely on physical damage.",
    "alternative": "flygon",
    "alternativeReason": "Flygon adds Levitate’s Ground immunity but has lower Attack and bulk."
  },
  "gengar": {
    "role": "Fast special setup attacker",
    "item": "Life Orb",
    "ability": "Cursed Body",
    "nature": "Timid",
    "moves": [
      "Shadow Ball",
      "Sludge Bomb",
      "Focus Blast",
      "Nasty Plot"
    ],
    "plan": "Nasty Plot boosts Special Attack when a switch gives Gengar a safe turn. Ghost and Poison attacks provide its primary damage.",
    "caution": "Gengar has Cursed Body in Generation 9, not Levitate. Ground attacks can hit it, and Focus Blast’s accuracy makes it an unreliable emergency answer.",
    "partners": "A Flying teammate can switch into Ground attacks. A bulky partner can help create safer opportunities to bring Gengar in.",
    "alternative": "alakazam",
    "alternativeReason": "Alakazam is another fast special attacker for broader National Dex planning; availability differs by game."
  },
  "dragonite": {
    "role": "Physical setup attacker",
    "item": "Heavy-Duty Boots",
    "ability": "Multiscale",
    "nature": "Adamant",
    "moves": [
      "Dragon Dance",
      "Extreme Speed",
      "Earthquake",
      "Dragon Claw"
    ],
    "plan": "Keep Dragonite at full HP to benefit from Multiscale. Dragon Dance raises Attack and Speed; Extreme Speed provides priority.",
    "caution": "Ice attacks deal 4× damage. Chip damage disables Multiscale, Ghost types ignore Extreme Speed, and Fairy types ignore Dragon Claw.",
    "partners": "Steel teammates can cover Ice, Dragon and Fairy attacks. Support that preserves full HP helps its ability work.",
    "alternative": "salamence",
    "alternativeReason": "Salamence offers a different Dragon/Flying attacker with Intimidate, but lacks Multiscale and Extreme Speed."
  },
  "lucario": {
    "role": "Physical setup attacker",
    "item": "Life Orb",
    "ability": "Inner Focus",
    "nature": "Jolly",
    "moves": [
      "Swords Dance",
      "Close Combat",
      "Extreme Speed",
      "Meteor Mash"
    ],
    "plan": "Use a safe turn to raise Attack with Swords Dance, then attack or finish a weakened target with Extreme Speed.",
    "caution": "Close Combat lowers both defenses. Ground, Fire and Fighting attacks threaten Lucario; Ghost types are immune to Extreme Speed.",
    "partners": "A Flying teammate covers Ground attacks and can resist Fighting. A Water teammate helps cover Fire attackers.",
    "alternative": "scizor",
    "alternativeReason": "Scizor provides Steel-type priority through Bullet Punch, with a different set of weaknesses."
  }
};
