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
    "alternativeReason": "Raichu offers more Speed and bulk, but cannot use Light Ball’s boost.",
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
    "caution": "Rock attacks deal 4× damage. Boots do not reduce direct Rock damage, and losing the item leaves it vulnerable to Stealth Rock.",
    "partners": "A Water or Ground partner can help against Rock types. Check that the rest of the team can handle Electric attackers.",
    "alternative": "arcanine",
    "alternativeReason": "Arcanine offers a different Fire role with Intimidate, without Charizard’s Ground immunity.",
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
    "caution": "Ice attacks deal 4× damage. Fairy types ignore Dragon Claw, and Flying types ignore Earthquake. This set has no Fire coverage, so Steel/Flying opponents such as Corviknight can stop both attacks.",
    "partners": "A Steel teammate can resist Ice, Dragon and Fairy attacks. A special attacker helps avoid relying entirely on physical damage.",
    "alternative": "flygon",
    "alternativeReason": "Flygon adds Levitate’s Ground immunity but has lower Attack and bulk.",
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
    "caution": "Gengar has Cursed Body in Generation 9, not Levitate. Ground attacks can hit it, and Focus Blast’s accuracy makes it an unreliable emergency answer.",
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
    "caution": "Ice attacks deal 4× damage, and chip damage disables Multiscale until HP is fully restored. Ghost types ignore Extreme Speed and Fairy types ignore Dragon Claw. Without Normal Tera, Extreme Speed has no same-type bonus.",
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
  },
  "corviknight": {
    "role": "Defensive pivot",
    "item": "Leftovers",
    "ability": "Pressure",
    "nature": "Impish",
    "moves": [
      "Brave Bird",
      "Body Press",
      "Roost",
      "U-turn"
    ],
    "plan": "Use Roost to recover after taking a hit, then U-turn to bring an attacker in. Body Press uses Defense rather than Attack.",
    "caution": "Fire and Electric attacks are super effective. Brave Bird recoil and repeated hits can wear it down; Roost temporarily removes Flying typing for that turn.",
    "partners": "A Ground partner covers Electric attacks; a Water partner helps against Fire attackers.",
    "alternative": "skarmory",
    "alternativeReason": "Skarmory shares Steel/Flying typing, but offers a different support movepool."
  },
  "gastrodon": {
    "role": "Bulky special attacker and recovery support",
    "item": "Leftovers",
    "ability": "Storm Drain",
    "nature": "Calm",
    "moves": [
      "Earth Power",
      "Surf",
      "Ice Beam",
      "Recover"
    ],
    "plan": "Switch into a predicted Water attack to activate Storm Drain, then attack or use Recover. Storm Drain grants Water immunity and raises Special Attack when hit by Water moves.",
    "caution": "Grass attacks deal 4× damage. Its low Speed makes it vulnerable to strong attackers, and Storm Drain does not protect against Grass coverage.",
    "partners": "A Steel/Flying or Fire teammate can resist Grass attacks. Add a faster attacker to complement its low Speed.",
    "alternative": "quagsire",
    "alternativeReason": "Quagsire shares Water/Ground typing but uses different abilities and an alternative defensive role."
  },
  "scizor": {
    "role": "Physical setup attacker with priority",
    "item": "Leftovers",
    "ability": "Technician",
    "nature": "Adamant",
    "moves": [
      "Bullet Punch",
      "U-turn",
      "Swords Dance",
      "Close Combat"
    ],
    "plan": "Use Swords Dance when a switch gives you room. Technician boosts Bullet Punch, while U-turn can maintain momentum when staying in is unsafe.",
    "caution": "Fire attacks deal 4× damage. U-turn removes Swords Dance boosts when Scizor leaves the field, so decide whether to pivot or commit to attacking.",
    "partners": "A Water teammate can resist Fire. A special attacker helps avoid a team focused entirely on physical damage.",
    "alternative": "lucario",
    "alternativeReason": "Lucario provides Steel typing and priority with a different offensive toolkit and weaknesses."
  },
  "azumarill": {
    "role": "Physical attacker with priority",
    "item": "Sitrus Berry",
    "ability": "Huge Power",
    "nature": "Adamant",
    "moves": [
      "Liquidation",
      "Play Rough",
      "Aqua Jet",
      "Belly Drum"
    ],
    "plan": "Belly Drum maximizes Attack at the cost of half your maximum HP. A Sitrus Berry can restore some HP when its activation threshold is met; Aqua Jet gives priority.",
    "caution": "Setup is risky and fails without enough HP. Grass, Electric and Poison attacks threaten it; priority does not guarantee a knockout.",
    "partners": "A Ground partner can cover Electric attacks. A Steel teammate can help against Poison attacks.",
    "alternative": "primarina",
    "alternativeReason": "Primarina shares Water/Fairy typing but attacks primarily with Special Attack."
  },
  "gyarados": {
    "role": "Physical setup attacker",
    "item": "Heavy-Duty Boots",
    "ability": "Intimidate",
    "nature": "Jolly",
    "moves": [
      "Waterfall",
      "Earthquake",
      "Ice Fang",
      "Dragon Dance"
    ],
    "plan": "Intimidate lowers the opposing Pokémon’s Attack on entry unless an immunity or effect prevents it. Find a safe turn for Dragon Dance, then attack.",
    "caution": "Electric attacks deal 4× damage. Intimidate does not weaken special attacks, and Boots only protect from entry hazards.",
    "partners": "A Ground teammate provides Electric immunity. A Steel teammate can help cover Rock attacks.",
    "alternative": "dragonite",
    "alternativeReason": "Dragonite offers another Flying setup attacker, exchanging Water typing and Intimidate for a different role."
  },
  "clefable": {
    "role": "Bulky special setup attacker",
    "item": "Leftovers",
    "ability": "Magic Guard",
    "nature": "Bold",
    "moves": [
      "Moonblast",
      "Calm Mind",
      "Moonlight",
      "Flamethrower"
    ],
    "plan": "Use Calm Mind to raise Special Attack and Special Defense, then recover with Moonlight when needed. Magic Guard prevents most indirect damage.",
    "caution": "Poison and Steel attacks are super effective. Magic Guard does not prevent direct attacks or all status effects; Moonlight recovery changes with weather.",
    "partners": "A Steel teammate can switch into Poison attacks. A Fire or Ground attacker can help pressure Steel types.",
    "alternative": "azumarill",
    "alternativeReason": "Azumarill offers Fairy typing with a physical attacking role and Water coverage."
  },
  "raichu": {
    "role": "Fast special pivot",
    "item": "Life Orb",
    "ability": "Lightning Rod",
    "nature": "Timid",
    "moves": [
      "Thunderbolt",
      "Volt Switch",
      "Grass Knot",
      "Surf"
    ],
    "plan": "Use Volt Switch against a favorable matchup to bring another teammate in. Lightning Rod grants Electric immunity and can raise Special Attack.",
    "caution": "Ground types block Electric moves. Low bulk and Life Orb recoil make repeated direct switches risky.",
    "partners": "A Flying teammate covers Ground attacks. Add a bulky partner to handle hits Raichu cannot take.",
    "alternative": "pikachu",
    "alternativeReason": "Pikachu trades Raichu’s higher Speed and bulk for access to Light Ball."
  },
  "arcanine": {
    "role": "Physical attacker with recovery",
    "item": "Heavy-Duty Boots",
    "ability": "Intimidate",
    "nature": "Adamant",
    "moves": [
      "Flare Blitz",
      "Extreme Speed",
      "Will-O-Wisp",
      "Morning Sun"
    ],
    "plan": "Intimidate can soften a physical attacker on entry. Burn a suitable target or attack, then use Morning Sun when a safe turn appears.",
    "caution": "Flare Blitz causes recoil. Water, Ground and Rock attacks threaten it, and Morning Sun recovery depends on weather.",
    "partners": "A Flying partner covers Ground attacks; a bulky Water partner can help against Rock and Water attackers.",
    "alternative": "charizard",
    "alternativeReason": "Charizard provides Ground immunity and a special attacking option, but has a 4× Rock weakness."
  },
  "flygon": {
    "role": "Physical pivot and Ground coverage",
    "item": "Choice Scarf",
    "ability": "Levitate",
    "nature": "Jolly",
    "moves": [
      "Earthquake",
      "Dragon Claw",
      "U-turn",
      "Stone Edge"
    ],
    "plan": "Choice Scarf raises Speed but locks Flygon into the first move it uses until it switches. Use U-turn when a matchup favors a teammate.",
    "caution": "Ice attacks deal 4× damage. Fairy types ignore Dragon Claw and Flying types avoid Earthquake; a Choice lock can give opponents a free turn.",
    "partners": "A Steel teammate can cover Fairy and Dragon attacks; a Water teammate helps against Ice attackers.",
    "alternative": "garchomp",
    "alternativeReason": "Garchomp offers higher Attack and bulk but lacks Levitate’s Ground immunity."
  },
  "salamence": {
    "role": "Physical setup attacker",
    "item": "Heavy-Duty Boots",
    "ability": "Intimidate",
    "nature": "Jolly",
    "moves": [
      "Dragon Dance",
      "Dragon Claw",
      "Earthquake",
      "Dual Wingbeat"
    ],
    "plan": "Use Intimidate to soften a physical attacker, then look for a safe Dragon Dance turn. Boots help protect Salamence from entry hazards.",
    "caution": "Ice attacks deal 4× damage. Intimidate does not reduce special damage, and Fairy types are immune to Dragon Claw.",
    "partners": "A Steel partner can resist Ice, Dragon and Fairy attacks. Add a special attacker for damage variety.",
    "alternative": "dragonite",
    "alternativeReason": "Dragonite offers Multiscale and Extreme Speed, but has lower base Speed."
  }
};
