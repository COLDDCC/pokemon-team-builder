export interface PokemonGuide { role: string; item: string; ability: string; nature: string; moves: string[]; moveNotes?: Record<string, string>; plan: string; caution: string; partners: string; alternative: string; alternativeReason: string; }
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
    "plan": "Bring Pikachu in after a teammate faints or through a safe pivot. Light Ball doubles its Attack and Special Attack. Use Thunderbolt for damage, or Volt Switch to keep momentum when the opponent has no Ground switch-in.",
    "caution": "Its low bulk makes direct switches risky. Ground types block Electric attacks; coverage does not guarantee a safe matchup.",
    "partners": "A Flying teammate can cover Ground attacks; a bulky Water partner can absorb hits Pikachu cannot.",
    "alternative": "raichu",
    "alternativeReason": "Raichu offers more Speed and bulk, but cannot use Light Ball\u2019s boost.",
    "moveNotes": {
      "Thunderbolt": "Reliable Electric damage; Ground types are immune.",
      "Volt Switch": "Deal damage and switch out; Ground types block the pivot.",
      "Grass Knot": "Coverage for heavier Ground types; power depends on weight.",
      "Surf": "Water coverage for Ground types; does not make switching into them safe."
    }
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
    "plan": "Heavy-Duty Boots prevent entry-hazard damage while held. Bring Charizard into a favorable matchup, use Flamethrower against Steel targets, and use Will-O-Wisp when a physical attacker is likely to switch in.",
    "caution": "Rock attacks deal 4\u00d7 damage. Boots do not reduce direct Rock damage, and losing the item leaves it vulnerable to Stealth Rock.",
    "partners": "A Water or Ground partner can help against Rock types. Check that the rest of the team can handle Electric attackers.",
    "alternative": "arcanine",
    "alternativeReason": "Arcanine offers a different Fire role with Intimidate, without Charizard\u2019s Ground immunity.",
    "moveNotes": {
      "Flamethrower": "Reliable Fire damage against Steel, Grass and Ice targets.",
      "Air Slash": "Flying damage with a chance to flinch if Charizard moves first.",
      "Dragon Pulse": "Dragon coverage; Fairy types are immune.",
      "Will-O-Wisp": "Burn a physical attacker; Fire types cannot be burned."
    }
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
    "caution": "Ice attacks deal 4\u00d7 damage. Fairy types ignore Dragon Claw, and Flying types ignore Earthquake. This set has no Fire coverage, so Steel/Flying opponents such as Corviknight can stop both attacks.",
    "partners": "A Steel teammate can resist Ice, Dragon and Fairy attacks. A special attacker helps avoid relying entirely on physical damage.",
    "alternative": "flygon",
    "alternativeReason": "Flygon adds Levitate\u2019s Ground immunity but has lower Attack and bulk.",
    "moveNotes": {
      "Earthquake": "Strong Ground damage; Flying types and Levitate avoid it.",
      "Dragon Claw": "Dragon damage without locking into the move; Fairy types are immune.",
      "Swords Dance": "Boost Attack by two stages when a safe turn is available.",
      "Stealth Rock": "Punish opposing switches; choose this or setup based on the turn."
    }
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
    "plan": "Bring Gengar in through a safe pivot, then attack with Shadow Ball or Sludge Bomb. Use Nasty Plot only when the opponent is forced out or cannot threaten a knockout. Life Orb adds damage but costs HP after a damaging hit.",
    "caution": "Gengar has Cursed Body in Generation 9, not Levitate. Ground attacks can hit it, and Focus Blast\u2019s accuracy makes it an unreliable emergency answer.",
    "partners": "A Flying teammate can switch into Ground attacks. A bulky partner can help create safer opportunities to bring Gengar in.",
    "alternative": "alakazam",
    "alternativeReason": "Alakazam is another fast special attacker for broader National Dex planning; availability differs by game.",
    "moveNotes": {
      "Shadow Ball": "Main Ghost attack; Normal types are immune.",
      "Sludge Bomb": "Poison attack for Fairy targets; Steel types are immune.",
      "Focus Blast": "Coverage against Dark and Steel targets; only 70% accurate.",
      "Nasty Plot": "Boost Special Attack by two stages; avoid setting up under pressure."
    }
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
    "plan": "Keep Dragonite at full HP so Multiscale halves incoming damage. Boots help preserve that protection against entry hazards. Use a safe turn for Dragon Dance, then select coverage or Extreme Speed to finish a weakened target.",
    "caution": "Ice attacks deal 4\u00d7 damage, and chip damage disables Multiscale until HP is fully restored. Ghost types ignore Extreme Speed and Fairy types ignore Dragon Claw. Without Normal Tera, Extreme Speed has no same-type bonus.",
    "partners": "Steel teammates can cover Ice, Dragon and Fairy attacks. Support that preserves full HP helps its ability work.",
    "alternative": "salamence",
    "alternativeReason": "Salamence offers a different Dragon/Flying attacker with Intimidate, but lacks Multiscale and Extreme Speed.",
    "moveNotes": {
      "Dragon Dance": "Boost Attack and Speed by one stage on a safe turn.",
      "Extreme Speed": "High-priority Normal attack; Ghost types are immune.",
      "Earthquake": "Ground coverage for many Steel targets; Flying types avoid it.",
      "Dragon Claw": "Dragon attack; Fairy types are immune."
    }
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
    "plan": "Bring Lucario in after a teammate faints or through a safe pivot. Use Swords Dance when a switch is likely, then choose Close Combat or Meteor Mash for damage. Save Extreme Speed for weakened faster targets.",
    "caution": "Close Combat lowers both defenses. Ground, Fire and Fighting attacks threaten Lucario; Ghost types are immune to Extreme Speed.",
    "partners": "A Flying teammate covers Ground attacks and can resist Fighting. A Water teammate helps cover Fire attackers.",
    "alternative": "scizor",
    "alternativeReason": "Scizor provides Steel-type priority through Bullet Punch, with a different set of weaknesses.",
    "moveNotes": {
      "Swords Dance": "Boost Attack by two stages before attempting to sweep.",
      "Close Combat": "Strong Fighting damage, but lowers both defenses afterward.",
      "Extreme Speed": "High-priority Normal attack; Ghost types are immune.",
      "Meteor Mash": "Steel damage for Fairy targets; can raise Attack but may miss."
    }
  }
};
