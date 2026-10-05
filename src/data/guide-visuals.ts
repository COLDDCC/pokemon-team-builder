export const guideVisuals: Record<string, { evolution: { id: string; condition: string }[]; partners: { id: string; reason: string }[] }> = {
  "pikachu": {
    "evolution": [
      {
        "id": "pichu",
        "condition": ""
      },
      {
        "id": "pikachu",
        "condition": "High friendship + level up"
      },
      {
        "id": "raichu",
        "condition": "Thunder Stone"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Ground immunity and a sturdier switch-in."
      },
      {
        "id": "gastrodon",
        "reason": "Immune to Electric attacks; resists Fire and Rock."
      }
    ]
  },
  "charizard": {
    "evolution": [
      {
        "id": "charmander",
        "condition": ""
      },
      {
        "id": "charmeleon",
        "condition": "Level 16"
      },
      {
        "id": "charizard",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Resists Rock and is immune to Electric attacks."
      },
      {
        "id": "corviknight",
        "reason": "Resists Rock; shares an Electric weakness, so keep a Ground partner."
      }
    ]
  },
  "garchomp": {
    "evolution": [
      {
        "id": "gible",
        "condition": ""
      },
      {
        "id": "gabite",
        "condition": "Level 24"
      },
      {
        "id": "garchomp",
        "condition": "Level 48"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Fairy and Dragon; takes neutral Ice damage."
      },
      {
        "id": "azumarill",
        "reason": "Resists Ice and is immune to Dragon attacks."
      }
    ]
  },
  "gengar": {
    "evolution": [
      {
        "id": "gastly",
        "condition": ""
      },
      {
        "id": "haunter",
        "condition": "Level 25"
      },
      {
        "id": "gengar",
        "condition": "Trade"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Ground; resists Psychic attacks."
      },
      {
        "id": "clefable",
        "reason": "Resists Dark attacks; adds a Fairy option."
      }
    ]
  },
  "dragonite": {
    "evolution": [
      {
        "id": "dratini",
        "condition": ""
      },
      {
        "id": "dragonair",
        "condition": "Level 30"
      },
      {
        "id": "dragonite",
        "condition": "Level 55"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock; takes neutral Ice damage."
      }
    ]
  },
  "lucario": {
    "evolution": [
      {
        "id": "riolu",
        "condition": ""
      },
      {
        "id": "lucario",
        "condition": "High friendship + level up during daytime"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Fire and Fighting."
      },
      {
        "id": "slowbro",
        "reason": "Resists Fire and Fighting; adds a bulky Water option."
      }
    ]
  },
  "corviknight": {
    "evolution": [
      {
        "id": "rookidee",
        "condition": ""
      },
      {
        "id": "corvisquire",
        "condition": "Level 18"
      },
      {
        "id": "corviknight",
        "condition": "Level 38"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Immune to Electric and resists Fire attacks."
      },
      {
        "id": "garchomp",
        "reason": "Immune to Electric and resists Fire; still needs Ice coverage."
      }
    ]
  },
  "gastrodon": {
    "evolution": [
      {
        "id": "shellos",
        "condition": ""
      },
      {
        "id": "gastrodon",
        "condition": "Level 30"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass attacks and is immune to Ground."
      },
      {
        "id": "charizard",
        "reason": "Resists Grass; Gastrodon covers Electric and resists Rock."
      }
    ]
  },
  "scizor": {
    "evolution": [
      {
        "id": "scyther",
        "condition": ""
      },
      {
        "id": "scizor",
        "condition": "Trade while holding Metal Coat"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Resists Fire; Scizor resists its Grass weakness."
      },
      {
        "id": "gyarados",
        "reason": "Resists Fire; Intimidate can soften physical attackers."
      }
    ]
  },
  "azumarill": {
    "evolution": [
      {
        "id": "azurill",
        "condition": ""
      },
      {
        "id": "marill",
        "condition": "High friendship + level up"
      },
      {
        "id": "azumarill",
        "condition": "Level 18"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric and resists Poison attacks."
      },
      {
        "id": "scizor",
        "reason": "Immune to Poison; Azumarill resists its Fire weakness."
      }
    ]
  },
  "gyarados": {
    "evolution": [
      {
        "id": "magikarp",
        "condition": ""
      },
      {
        "id": "gyarados",
        "condition": "Level 20"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric and resists Rock attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Immune to Electric and resists Rock; both need Grass checks."
      }
    ]
  },
  "clefable": {
    "evolution": [
      {
        "id": "cleffa",
        "condition": ""
      },
      {
        "id": "clefairy",
        "condition": "High friendship + level up"
      },
      {
        "id": "clefable",
        "condition": "Moon Stone"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Poison; takes neutral Steel damage."
      },
      {
        "id": "garchomp",
        "reason": "Resists Poison and can pressure Steel types with Ground attacks."
      }
    ]
  },
  "raichu": {
    "evolution": [
      {
        "id": "pichu",
        "condition": ""
      },
      {
        "id": "pikachu",
        "condition": "High friendship + level up"
      },
      {
        "id": "raichu",
        "condition": "Thunder Stone"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Ground attacks; Raichu covers its Electric weakness."
      },
      {
        "id": "gastrodon",
        "reason": "Adds bulk and resists Rock and Fire attacks."
      }
    ]
  },
  "arcanine": {
    "evolution": [
      {
        "id": "growlithe",
        "condition": ""
      },
      {
        "id": "arcanine",
        "condition": "Fire Stone"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and has Water immunity with Storm Drain."
      }
    ]
  },
  "flygon": {
    "evolution": [
      {
        "id": "trapinch",
        "condition": ""
      },
      {
        "id": "vibrava",
        "condition": "Level 35"
      },
      {
        "id": "flygon",
        "condition": "Level 45"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy attacks."
      },
      {
        "id": "primarina",
        "reason": "Resists Ice and is immune to Dragon attacks."
      }
    ]
  },
  "salamence": {
    "evolution": [
      {
        "id": "bagon",
        "condition": ""
      },
      {
        "id": "shelgon",
        "condition": "Level 30"
      },
      {
        "id": "salamence",
        "condition": "Level 50"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy attacks."
      },
      {
        "id": "clefable",
        "reason": "Immune to Dragon attacks; adds a special attacker."
      }
    ]
  },
  "primarina": {
    "evolution": [
      {
        "id": "popplio",
        "condition": ""
      },
      {
        "id": "brionne",
        "condition": "Level 17"
      },
      {
        "id": "primarina",
        "condition": "Level 34"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric and resists Poison attacks."
      },
      {
        "id": "corviknight",
        "reason": "Immune to Poison and resists Grass; both need an Electric answer."
      }
    ]
  },
  "slowbro": {
    "evolution": [
      {
        "id": "slowpoke",
        "condition": ""
      },
      {
        "id": "slowbro",
        "condition": "Level 37"
      }
    ],
    "partners": [
      {
        "id": "clefable",
        "reason": "Resists Dark and Bug attacks."
      },
      {
        "id": "garchomp",
        "reason": "Immune to Electric attacks; takes neutral Grass damage."
      }
    ]
  },
  "blastoise": {
    "evolution": [
      {
        "id": "squirtle",
        "condition": ""
      },
      {
        "id": "wartortle",
        "condition": "Level 16"
      },
      {
        "id": "blastoise",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric attacks; Blastoise resists Ice."
      },
      {
        "id": "scizor",
        "reason": "Resists Grass; Blastoise resists Scizor’s Fire weakness."
      }
    ]
  },
  "venusaur": {
    "evolution": [
      {
        "id": "bulbasaur",
        "condition": ""
      },
      {
        "id": "ivysaur",
        "condition": "Level 16"
      },
      {
        "id": "venusaur",
        "condition": "Level 32"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Flying and Psychic attacks; both need a Fire answer."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Fire; Venusaur resists its Grass weakness."
      }
    ]
  },
  "tyranitar": {
    "evolution": [
      {
        "id": "larvitar",
        "condition": ""
      },
      {
        "id": "pupitar",
        "condition": "Level 30"
      },
      {
        "id": "tyranitar",
        "condition": "Level 55"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Provides Ground immunity and avoids sand damage through Steel typing; Fighting damage is neutral."
      },
      {
        "id": "clefable",
        "reason": "Resists Fighting; Magic Guard prevents sand damage."
      }
    ]
  },
  "gardevoir": {
    "evolution": [
      {
        "id": "ralts",
        "condition": ""
      },
      {
        "id": "kirlia",
        "condition": "Level 20"
      },
      {
        "id": "gardevoir",
        "condition": "Level 30"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Immune to Poison and resists Steel attacks."
      },
      {
        "id": "umbreon",
        "reason": "Resists Ghost attacks; Gardevoir resists Fighting."
      }
    ]
  },
  "umbreon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "umbreon",
        "condition": "High friendship + level up at night; avoid meeting Sylveon’s conditions"
      }
    ],
    "partners": [
      {
        "id": "sylveon",
        "reason": "Resists Fighting and Bug attacks."
      },
      {
        "id": "scizor",
        "reason": "Resists Fairy and Bug; takes neutral Fighting damage."
      }
    ]
  },
  "sylveon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "sylveon",
        "condition": "High friendship + level up while knowing a Fairy move (Generation 9)"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Poison and takes neutral Steel damage."
      },
      {
        "id": "garchomp",
        "reason": "Resists Poison and can pressure Steel types with Earthquake."
      }
    ]
  },
  "amoonguss": {
    "evolution": [
      {
        "id": "foongus",
        "condition": ""
      },
      {
        "id": "amoonguss",
        "condition": "Level 39"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Flying and Psychic; both still need a Fire answer."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Fire; Amoonguss resists its Grass weakness."
      }
    ]
  },
  "skarmory": {
    "evolution": [
      {
        "id": "skarmory",
        "condition": ""
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Immune to Electric and resists Fire attacks."
      },
      {
        "id": "garchomp",
        "reason": "Immune to Electric and resists Fire; needs an Ice answer."
      }
    ]
  },
  "quagsire": {
    "evolution": [
      {
        "id": "wooper",
        "condition": ""
      },
      {
        "id": "quagsire",
        "condition": "Level 20"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass attacks and is immune to Ground."
      },
      {
        "id": "venusaur",
        "reason": "Resists Grass and provides special damage."
      }
    ]
  },
  "toxapex": {
    "evolution": [
      {
        "id": "mareanie",
        "condition": ""
      },
      {
        "id": "toxapex",
        "condition": "Level 38"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric; Toxapex resists Ice attacks."
      },
      {
        "id": "corviknight",
        "reason": "Immune to Ground and resists Psychic; both need an Electric answer."
      }
    ]
  },
  "mimikyu": {
    "evolution": [
      {
        "id": "mimikyu",
        "condition": ""
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost; Mimikyu is immune to Fighting attacks."
      },
      {
        "id": "arcanine",
        "reason": "Resists Steel; adds Intimidate support against physical attackers."
      }
    ]
  },
  "snorlax": {
    "evolution": [
      {
        "id": "munchlax",
        "condition": ""
      },
      {
        "id": "snorlax",
        "condition": "High friendship + level up"
      }
    ],
    "partners": [
      {
        "id": "mimikyu",
        "reason": "Immune to Fighting; Snorlax is immune to Ghost attacks."
      },
      {
        "id": "clefable",
        "reason": "Resists Fighting attacks and adds special damage."
      }
    ]
  },
  "meowscarada": {
    "evolution": [
      {
        "id": "sprigatito",
        "condition": ""
      },
      {
        "id": "floragato",
        "condition": "Level 16"
      },
      {
        "id": "meowscarada",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Bug, Fairy, Flying and Poison; both need a Fire answer."
      },
      {
        "id": "arcanine",
        "reason": "Resists Bug, Fire and Ice attacks."
      }
    ]
  },
  "skeledirge": {
    "evolution": [
      {
        "id": "fuecoco",
        "condition": ""
      },
      {
        "id": "crocalor",
        "condition": "Level 16"
      },
      {
        "id": "skeledirge",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and has Water immunity with Storm Drain."
      }
    ]
  },
  "quaquaval": {
    "evolution": [
      {
        "id": "quaxly",
        "condition": ""
      },
      {
        "id": "quaxwell",
        "condition": "Level 16"
      },
      {
        "id": "quaquaval",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric attacks; Quaquaval resists Ice."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass, Psychic and Fairy; both need an Electric answer."
      }
    ]
  },
  "dragapult": {
    "evolution": [
      {
        "id": "dreepy",
        "condition": ""
      },
      {
        "id": "drakloak",
        "condition": "Level 50"
      },
      {
        "id": "dragapult",
        "condition": "Level 60"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy; Dragapult resists Fire."
      },
      {
        "id": "clefable",
        "reason": "Resists Dark and is immune to Dragon attacks."
      }
    ]
  },
  "haxorus": {
    "evolution": [
      {
        "id": "axew",
        "condition": ""
      },
      {
        "id": "fraxure",
        "condition": "Level 38"
      },
      {
        "id": "haxorus",
        "condition": "Level 48"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy attacks."
      },
      {
        "id": "primarina",
        "reason": "Resists Ice and is immune to Dragon attacks."
      }
    ]
  },
  "goodra": {
    "evolution": [
      {
        "id": "goomy",
        "condition": ""
      },
      {
        "id": "sliggoo",
        "condition": "Level 40"
      },
      {
        "id": "goodra",
        "condition": "Level 50 or higher + level up in overworld rain (not Rain Dance)"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Dragon and Fairy; takes neutral Ice damage."
      },
      {
        "id": "scizor",
        "reason": "Resists Ice, Dragon and Fairy attacks."
      }
    ]
  },
  "magnezone": {
    "evolution": [
      {
        "id": "magnemite",
        "condition": ""
      },
      {
        "id": "magneton",
        "condition": "Level 30"
      },
      {
        "id": "magnezone",
        "condition": "Thunder Stone (Generation 9)"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Fire and Fighting."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Fire; Magnezone resists its Grass weakness."
      }
    ]
  },
  "milotic": {
    "evolution": [
      {
        "id": "feebas",
        "condition": ""
      },
      {
        "id": "milotic",
        "condition": "Trade while holding Prism Scale (Scarlet/Violet)"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric; Milotic resists Ice attacks."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass; both still need an Electric answer."
      }
    ]
  },
  "jolteon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "jolteon",
        "condition": "Thunder Stone"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Ground; Jolteon covers its Electric weakness."
      },
      {
        "id": "gastrodon",
        "reason": "Adds bulk and resists Fire and Rock attacks."
      }
    ]
  },
  "vaporeon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "vaporeon",
        "condition": "Water Stone"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric; Vaporeon resists Ice attacks."
      },
      {
        "id": "scizor",
        "reason": "Resists Grass; Vaporeon resists Scizor’s Fire weakness."
      }
    ]
  },
  "leafeon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "leafeon",
        "condition": "Leaf Stone (Generation 9)"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Immune to Poison and resists Flying and Bug attacks."
      },
      {
        "id": "arcanine",
        "reason": "Resists Fire, Ice and Bug attacks."
      }
    ]
  },
  "glaceon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "glaceon",
        "condition": "Ice Stone (Generation 9)"
      }
    ],
    "partners": [
      {
        "id": "milotic",
        "reason": "Resists Fire and Steel attacks."
      },
      {
        "id": "mimikyu",
        "reason": "Immune to Fighting attacks; both need a Steel answer."
      }
    ]
  },
  "flareon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "flareon",
        "condition": "Fire Stone"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and has Water immunity with Storm Drain."
      }
    ]
  },
  "espeon": {
    "evolution": [
      {
        "id": "eevee",
        "condition": ""
      },
      {
        "id": "espeon",
        "condition": "High friendship + level up during daytime; avoid meeting Sylveon’s conditions"
      }
    ],
    "partners": [
      {
        "id": "sylveon",
        "reason": "Resists Bug and Dark attacks."
      },
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark attacks."
      }
    ]
  },
  "tentacruel": {
    "evolution": [
      {
        "id": "tentacool",
        "condition": ""
      },
      {
        "id": "tentacruel",
        "condition": "Level 30"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Immune to Electric; Tentacruel resists Ice attacks."
      },
      {
        "id": "corviknight",
        "reason": "Immune to Ground and resists Psychic; both need an Electric answer."
      }
    ]
  },
  "krookodile": {
    "evolution": [
      {
        "id": "sandile",
        "condition": ""
      },
      {
        "id": "krokorok",
        "condition": "Level 29"
      },
      {
        "id": "krookodile",
        "condition": "Level 40"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass, Bug and Fairy; takes neutral Ice and Fighting damage."
      },
      {
        "id": "milotic",
        "reason": "Resists Water and Ice attacks."
      }
    ]
  },
  "breloom": {
    "evolution": [
      {
        "id": "shroomish",
        "condition": ""
      },
      {
        "id": "breloom",
        "condition": "Level 23 or higher; delay evolution to learn Spore as Shroomish"
      }
    ],
    "partners": [
      {
        "id": "magnezone",
        "reason": "Resists Flying and Fairy attacks; both need a Fire answer."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and Ice attacks."
      }
    ]
  },
  "chandelure": {
    "evolution": [
      {
        "id": "litwick",
        "condition": ""
      },
      {
        "id": "lampent",
        "condition": "Level 41"
      },
      {
        "id": "chandelure",
        "condition": "Dusk Stone"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark attacks."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and has Water immunity with Storm Drain."
      }
    ]
  },
  "meganium": {
    "evolution": [
      {
        "id": "chikorita",
        "condition": ""
      },
      {
        "id": "bayleef",
        "condition": "Level 16"
      },
      {
        "id": "meganium",
        "condition": "Level 32"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Ice, Flying, Poison and Bug; can use screen turns to set up."
      },
      {
        "id": "gyarados",
        "reason": "Resists Fire and Bug and can use Dragon Dance behind screens."
      }
    ]
  },
  "typhlosion": {
    "evolution": [
      {
        "id": "cyndaquil",
        "condition": ""
      },
      {
        "id": "quilava",
        "condition": "Level 14"
      },
      {
        "id": "typhlosion",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "tentacruel",
        "reason": "Rapid Spin can remove hazards to help preserve Eruption power."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and provides Water immunity through Storm Drain."
      }
    ]
  },
  "feraligatr": {
    "evolution": [
      {
        "id": "totodile",
        "condition": ""
      },
      {
        "id": "croconaw",
        "condition": "Level 18"
      },
      {
        "id": "feraligatr",
        "condition": "Level 30"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Electric immunity and Stealth Rock support complement physical setup."
      },
      {
        "id": "scizor",
        "reason": "Resists Grass and offers priority when Dragon Dance is unsafe."
      }
    ]
  },
  "sceptile": {
    "evolution": [
      {
        "id": "treecko",
        "condition": ""
      },
      {
        "id": "grovyle",
        "condition": "Level 16"
      },
      {
        "id": "sceptile",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists several Grass weaknesses and can pivot with U-turn."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and Ice and provides recovery alongside a frailer attacker."
      }
    ]
  },
  "blaziken": {
    "evolution": [
      {
        "id": "torchic",
        "condition": ""
      },
      {
        "id": "combusken",
        "condition": "Level 16"
      },
      {
        "id": "blaziken",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water and Fighting attacks."
      },
      {
        "id": "umbreon",
        "reason": "Immune to Psychic and can offer delayed recovery through Wish."
      }
    ]
  },
  "swampert": {
    "evolution": [
      {
        "id": "mudkip",
        "condition": ""
      },
      {
        "id": "marshtomp",
        "condition": "Level 16"
      },
      {
        "id": "swampert",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass and provides Ground immunity plus U-turn support."
      },
      {
        "id": "chandelure",
        "reason": "Resists Grass and adds special damage against Steel opponents."
      }
    ]
  },
  "torterra": {
    "evolution": [
      {
        "id": "turtwig",
        "condition": ""
      },
      {
        "id": "grotle",
        "condition": "Level 18"
      },
      {
        "id": "torterra",
        "condition": "Level 32"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Flying and can pivot an attacker into play; Ice damage is neutral."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and Ice and supplies a special attacking option."
      }
    ]
  },
  "infernape": {
    "evolution": [
      {
        "id": "chimchar",
        "condition": ""
      },
      {
        "id": "monferno",
        "condition": "Level 14"
      },
      {
        "id": "infernape",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water and Fighting attacks."
      },
      {
        "id": "umbreon",
        "reason": "Psychic immunity and Wish support help a recoil-prone attacker."
      }
    ]
  },
  "empoleon": {
    "evolution": [
      {
        "id": "piplup",
        "condition": ""
      },
      {
        "id": "prinplup",
        "condition": "Level 16"
      },
      {
        "id": "empoleon",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Provides Ground immunity and a defensive pivot; Fighting damage is neutral."
      },
      {
        "id": "garchomp",
        "reason": "Electric immunity and faster physical damage complement this set."
      }
    ]
  },
  "serperior": {
    "evolution": [
      {
        "id": "snivy",
        "condition": ""
      },
      {
        "id": "servine",
        "condition": "Level 17"
      },
      {
        "id": "serperior",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "chandelure",
        "reason": "Resists Fire, Ice, Poison and Bug and pressures Steel opponents."
      },
      {
        "id": "scizor",
        "reason": "Resists Ice, Flying, Poison and Bug and adds physical priority."
      }
    ]
  },
  "incineroar": {
    "evolution": [
      {
        "id": "litten",
        "condition": ""
      },
      {
        "id": "torracat",
        "condition": "Level 17"
      },
      {
        "id": "incineroar",
        "condition": "Level 34"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Ground immunity plus Water and Fighting resistance support pivoting."
      },
      {
        "id": "gastrodon",
        "reason": "Water immunity through Storm Drain and Rock resistance cover two weaknesses."
      }
    ]
  },
  "decidueye": {
    "evolution": [
      {
        "id": "rowlet",
        "condition": ""
      },
      {
        "id": "dartrix",
        "condition": "Level 17"
      },
      {
        "id": "decidueye",
        "condition": "Level 34"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and can provide delayed Wish recovery."
      },
      {
        "id": "empoleon",
        "reason": "Resists Ice and Flying and adds special damage."
      }
    ]
  },
  "samurott": {
    "evolution": [
      {
        "id": "oshawott",
        "condition": ""
      },
      {
        "id": "dewott",
        "condition": "Level 17"
      },
      {
        "id": "samurott",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Electric immunity and Stealth Rock support complement this set."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass and can pivot a frailer attacker into play."
      }
    ]
  },
  "delphox": {
    "evolution": [
      {
        "id": "fennekin",
        "condition": ""
      },
      {
        "id": "braixen",
        "condition": "Level 16"
      },
      {
        "id": "delphox",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and provides delayed Wish support."
      },
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water, but still needs Rock coverage."
      }
    ]
  },
  "chesnaught": {
    "evolution": [
      {
        "id": "chespin",
        "condition": ""
      },
      {
        "id": "quilladin",
        "condition": "Level 16"
      },
      {
        "id": "chesnaught",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "empoleon",
        "reason": "Resists Flying, Psychic, Fairy and Ice and adds special damage."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and Ice and provides direct recovery."
      }
    ]
  },
  "rillaboom": {
    "evolution": [
      {
        "id": "grookey",
        "condition": ""
      },
      {
        "id": "thwackey",
        "condition": "Level 16"
      },
      {
        "id": "rillaboom",
        "condition": "Level 35"
      }
    ],
    "partners": [
      {
        "id": "incineroar",
        "reason": "Resists Fire and Ice and provides another pivoting option."
      },
      {
        "id": "corviknight",
        "reason": "Resists Flying, Poison and Bug and can pivot with U-turn."
      }
    ]
  },
  "cinderace": {
    "evolution": [
      {
        "id": "scorbunny",
        "condition": ""
      },
      {
        "id": "raboot",
        "condition": "Level 16"
      },
      {
        "id": "cinderace",
        "condition": "Level 35"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Ground immunity and Water resistance help cover common threats."
      },
      {
        "id": "gastrodon",
        "reason": "Water immunity through Storm Drain and Rock resistance support switching."
      }
    ]
  },
  "inteleon": {
    "evolution": [
      {
        "id": "sobble",
        "condition": ""
      },
      {
        "id": "drizzile",
        "condition": "Level 16"
      },
      {
        "id": "inteleon",
        "condition": "Level 35"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Electric immunity and physical damage complement a special attacker."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass and offers a sturdier pivot with U-turn."
      }
    ]
  },
  "greninja": {
    "evolution": [
      {
        "id": "froakie",
        "condition": ""
      },
      {
        "id": "frogadier",
        "condition": "Level 16"
      },
      {
        "id": "greninja",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Electric immunity and physical damage complement special attacks."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass, Bug and Fairy and offers a sturdier pivot."
      }
    ]
  },
  "emboar": {
    "evolution": [
      {
        "id": "tepig",
        "condition": ""
      },
      {
        "id": "pignite",
        "condition": "Level 17"
      },
      {
        "id": "emboar",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Ground immunity plus Water and Fighting resistance help switching."
      },
      {
        "id": "umbreon",
        "reason": "Psychic immunity and delayed Wish healing support a recoil attacker."
      }
    ]
  },
  "metagross": {
    "evolution": [
      {
        "id": "beldum",
        "condition": ""
      },
      {
        "id": "metang",
        "condition": "Level 20"
      },
      {
        "id": "metagross",
        "condition": "Level 45"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Fire, complementing Steel typing."
      },
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and can provide Wish support."
      }
    ]
  },
  "hydreigon": {
    "evolution": [
      {
        "id": "deino",
        "condition": ""
      },
      {
        "id": "zweilous",
        "condition": "Level 50"
      },
      {
        "id": "hydreigon",
        "condition": "Level 64"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Fairy, Ice, Bug and Dragon and adds physical priority."
      },
      {
        "id": "empoleon",
        "reason": "Resists Fairy, Ice, Bug and Dragon and provides recovery."
      }
    ]
  },
  "garganacl": {
    "evolution": [
      {
        "id": "nacli",
        "condition": ""
      },
      {
        "id": "naclstack",
        "condition": "Level 24"
      },
      {
        "id": "garganacl",
        "condition": "Level 38"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Ground immunity and resistances to Grass and Steel help cover weaknesses; Fighting damage is neutral."
      },
      {
        "id": "rillaboom",
        "reason": "Resists Water and Grass and adds faster physical pressure."
      }
    ]
  },
  "electivire": {
    "evolution": [
      {
        "id": "elekid",
        "condition": ""
      },
      {
        "id": "electabuzz",
        "condition": "Level 30"
      },
      {
        "id": "electivire",
        "condition": "Trade holding Electirizer"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Ground immunity and U-turn help position an attacker safely."
      },
      {
        "id": "milotic",
        "reason": "Adds special damage and recovery alongside this physical attacker."
      }
    ]
  },
  "talonflame": {
    "evolution": [
      {
        "id": "fletchling",
        "condition": ""
      },
      {
        "id": "fletchinder",
        "condition": "Level 17"
      },
      {
        "id": "talonflame",
        "condition": "Level 35"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Electric immunity and Rock resistance cover two weaknesses."
      },
      {
        "id": "milotic",
        "reason": "Resists Water and supplies recovery plus special damage."
      }
    ]
  },
  "staraptor": {
    "evolution": [
      {
        "id": "starly",
        "condition": ""
      },
      {
        "id": "staravia",
        "condition": "Level 14"
      },
      {
        "id": "staraptor",
        "condition": "Level 34"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Electric immunity and Rock resistance help create switching options."
      },
      {
        "id": "empoleon",
        "reason": "Resists Ice and Rock and adds special damage with recovery."
      }
    ]
  },
  "heracross": {
    "evolution": [
      {
        "id": "heracross",
        "condition": ""
      }
    ],
    "partners": [
      {
        "id": "empoleon",
        "reason": "Resists Flying, Psychic and Fairy and adds special damage."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and supplies recovery alongside a worn-down attacker."
      }
    ]
  },
  "weavile": {
    "evolution": [
      {
        "id": "sneasel",
        "condition": ""
      },
      {
        "id": "weavile",
        "condition": "Level up at night holding Razor Claw"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Resists Fighting, Fire and Steel and provides Ground immunity."
      },
      {
        "id": "clefable",
        "reason": "Resists Fighting and adds a bulkier special attacking option."
      }
    ]
  },
  "mamoswine": {
    "evolution": [
      {
        "id": "swinub",
        "condition": ""
      },
      {
        "id": "piloswine",
        "condition": "Level 33"
      },
      {
        "id": "mamoswine",
        "condition": "Level up knowing Ancient Power"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Resists Water, Fighting and Steel and is immune to Ground."
      },
      {
        "id": "corviknight",
        "reason": "Resists Grass and Steel and provides Ground immunity; Fighting damage is neutral."
      }
    ]
  },
  "donphan": {
    "evolution": [
      {
        "id": "phanpy",
        "condition": ""
      },
      {
        "id": "donphan",
        "condition": "Level 25"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass and can pivot another teammate into play; Ice damage is neutral."
      },
      {
        "id": "milotic",
        "reason": "Resists Water and Ice and adds special damage with recovery."
      }
    ]
  },
  "blissey": {
    "evolution": [
      {
        "id": "happiny",
        "condition": ""
      },
      {
        "id": "chansey",
        "condition": "Level up in daytime holding Oval Stone"
      },
      {
        "id": "blissey",
        "condition": "High friendship + level up"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Adds physical defense and U-turn support; Fighting damage is neutral."
      },
      {
        "id": "gengar",
        "reason": "Immune to Fighting and adds faster special attacking pressure."
      }
    ]
  },
  "slowking": {
    "evolution": [
      {
        "id": "slowpoke",
        "condition": ""
      },
      {
        "id": "slowking",
        "condition": "Trade holding King's Rock"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and gives a different defensive support option."
      },
      {
        "id": "garchomp",
        "reason": "Electric immunity and physical damage complement this special set."
      }
    ]
  },
  "poliwrath": {
    "evolution": [
      {
        "id": "poliwag",
        "condition": ""
      },
      {
        "id": "poliwhirl",
        "condition": "Level 25"
      },
      {
        "id": "poliwrath",
        "condition": "Water Stone"
      }
    ],
    "partners": [
      {
        "id": "empoleon",
        "reason": "Resists Flying, Psychic and Fairy and supplies special damage; Grass damage is neutral."
      },
      {
        "id": "garchomp",
        "reason": "Electric immunity and faster physical pressure support the team."
      }
    ]
  },
  "kingdra": {
    "evolution": [
      {
        "id": "horsea",
        "condition": ""
      },
      {
        "id": "seadra",
        "condition": "Level 32"
      },
      {
        "id": "kingdra",
        "condition": "Trade holding Dragon Scale"
      }
    ],
    "partners": [
      {
        "id": "scizor",
        "reason": "Resists Dragon and Fairy and adds physical priority."
      },
      {
        "id": "empoleon",
        "reason": "Resists Dragon and Fairy and provides a recoverable defensive option."
      }
    ]
  },
  "porygonz": {
    "evolution": [
      {
        "id": "porygon",
        "condition": ""
      },
      {
        "id": "porygon2",
        "condition": "Trade holding Up-Grade"
      },
      {
        "id": "porygonz",
        "condition": "Trade holding Dubious Disc"
      }
    ],
    "partners": [
      {
        "id": "gengar",
        "reason": "Immune to Fighting and can pressure targets that ignore Normal attacks."
      },
      {
        "id": "gyarados",
        "reason": "Resists Fighting and adds physical damage with Intimidate support."
      }
    ]
  },
  "dusknoir": {
    "evolution": [
      {
        "id": "duskull",
        "condition": ""
      },
      {
        "id": "dusclops",
        "condition": "Level 37"
      },
      {
        "id": "dusknoir",
        "condition": "Trade holding Reaper Cloth"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and provides delayed Wish recovery."
      },
      {
        "id": "primarina",
        "reason": "Resists Dark and adds stronger special attacks plus Fairy coverage."
      }
    ]
  },
  "gallade": {
    "evolution": [
      {
        "id": "ralts",
        "condition": ""
      },
      {
        "id": "kirlia",
        "condition": "Level 20"
      },
      {
        "id": "gallade",
        "condition": "Dawn Stone on male Kirlia"
      }
    ],
    "partners": [
      {
        "id": "empoleon",
        "reason": "Resists Flying and Fairy and adds special damage with recovery."
      },
      {
        "id": "umbreon",
        "reason": "Resists Ghost and offers delayed Wish support for a Life Orb attacker."
      }
    ]
  },
  "conkeldurr": {
    "evolution": [
      {
        "id": "timburr",
        "condition": ""
      },
      {
        "id": "gurdurr",
        "condition": "Level 25"
      },
      {
        "id": "conkeldurr",
        "condition": "Trade"
      }
    ],
    "partners": [
      {
        "id": "empoleon",
        "reason": "Resists Flying, Psychic and Fairy and supplies special damage."
      },
      {
        "id": "gengar",
        "reason": "Adds fast special attacks against targets immune to Fighting and Normal."
      }
    ]
  },
  "luxray": {
    "evolution": [
      {
        "id": "shinx",
        "condition": ""
      },
      {
        "id": "luxio",
        "condition": "Level 15"
      },
      {
        "id": "luxray",
        "condition": "Level 30"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Ground immunity and U-turn provide complementary switching options."
      },
      {
        "id": "milotic",
        "reason": "Adds special damage and direct recovery alongside a recoil attacker."
      }
    ]
  },
  "magmortar": {
    "evolution": [
      {
        "id": "magby",
        "condition": ""
      },
      {
        "id": "magmar",
        "condition": "Level 30"
      },
      {
        "id": "magmortar",
        "condition": "Trade holding Magmarizer"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Ground immunity and Water resistance help cover weaknesses."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Rock and provides Water immunity through Storm Drain."
      }
    ]
  },
  "galvantula": {
    "evolution": [
      {
        "id": "joltik",
        "condition": ""
      },
      {
        "id": "galvantula",
        "condition": "Level 36"
      }
    ],
    "partners": [
      {
        "id": "milotic",
        "reason": "Resists Fire and adds recovery plus Water attacks against Rock targets."
      },
      {
        "id": "gallade",
        "reason": "Adds physical damage and can benefit from slower grounded opponents."
      }
    ]
  },
  "reuniclus": {
    "evolution": [
      {
        "id": "solosis",
        "condition": ""
      },
      {
        "id": "duosion",
        "condition": "Level 32"
      },
      {
        "id": "reuniclus",
        "condition": "Level 41"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and provides another defensive support option."
      },
      {
        "id": "scizor",
        "reason": "Resists Bug and adds physical damage with priority."
      }
    ]
  },
  "pelipper": {
    "evolution": [
      {
        "id": "wingull",
        "condition": ""
      },
      {
        "id": "pelipper",
        "condition": "Level 25"
      }
    ],
    "partners": [
      {
        "id": "kingdra",
        "reason": "Swift Swim benefits from rain and adds special attacking pressure."
      },
      {
        "id": "gastrodon",
        "reason": "Electric immunity and Rock resistance help cover weaknesses."
      }
    ]
  },
  "torkoal": {
    "evolution": [
      {
        "id": "torkoal",
        "condition": ""
      }
    ],
    "partners": [
      {
        "id": "garchomp",
        "reason": "Resists Rock and adds faster physical damage with Electric immunity."
      },
      {
        "id": "blissey",
        "reason": "Adds special defensive support alongside Torkoal’s higher physical Defense."
      }
    ]
  },
  "hippowdon": {
    "evolution": [
      {
        "id": "hippopotas",
        "condition": ""
      },
      {
        "id": "hippowdon",
        "condition": "Level 34"
      }
    ],
    "partners": [
      {
        "id": "corviknight",
        "reason": "Resists Grass and avoids sand damage; Ice damage is neutral."
      },
      {
        "id": "metagross",
        "reason": "Resists Grass and Ice and avoids sand damage through Steel typing."
      }
    ]
  },
  "abomasnow": {
    "evolution": [
      {
        "id": "snover",
        "condition": ""
      },
      {
        "id": "abomasnow",
        "condition": "Level 40"
      }
    ],
    "partners": [
      {
        "id": "milotic",
        "reason": "Resists Fire and offers recovery plus special damage."
      },
      {
        "id": "gyarados",
        "reason": "Resists Fire and can use Dragon Dance during protected turns."
      }
    ]
  },
  "whimsicott": {
    "evolution": [
      {
        "id": "cottonee",
        "condition": ""
      },
      {
        "id": "whimsicott",
        "condition": "Sun Stone"
      }
    ],
    "partners": [
      {
        "id": "metagross",
        "reason": "Immune to Poison and resists Ice and Flying, adding physical damage."
      },
      {
        "id": "gallade",
        "reason": "Adds physical attacks and can benefit from temporary Speed support."
      }
    ]
  },
  "klefki": {
    "evolution": [
      {
        "id": "klefki",
        "condition": ""
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Fire; can set up with Dragon Dance."
      },
      {
        "id": "gastrodon",
        "reason": "Resists Fire and provides recovery plus special attacking options."
      }
    ]
  },
  "houndoom": {
    "evolution": [
      {
        "id": "houndour",
        "condition": ""
      },
      {
        "id": "houndoom",
        "condition": "Level 24"
      }
    ],
    "partners": [
      {
        "id": "gyarados",
        "reason": "Immune to Ground and resists Water and Fighting attacks."
      },
      {
        "id": "milotic",
        "reason": "Resists Water and adds recovery alongside a frailer attacker."
      }
    ]
  },
  "honchkrow": {
    "evolution": [
      {
        "id": "murkrow",
        "condition": ""
      },
      {
        "id": "honchkrow",
        "condition": "Dusk Stone"
      }
    ],
    "partners": [
      {
        "id": "gastrodon",
        "reason": "Electric immunity and Rock resistance help create switching options."
      },
      {
        "id": "empoleon",
        "reason": "Resists Ice, Rock and Fairy and adds special damage with recovery."
      }
    ]
  },
  "mismagius": {
    "evolution": [
      {
        "id": "misdreavus",
        "condition": ""
      },
      {
        "id": "mismagius",
        "condition": "Dusk Stone"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and supplies delayed Wish support."
      },
      {
        "id": "scizor",
        "reason": "Adds physical priority and U-turn to complement special damage."
      }
    ]
  },
  "froslass": {
    "evolution": [
      {
        "id": "snorunt",
        "condition": ""
      },
      {
        "id": "froslass",
        "condition": "Dawn Stone on female Snorunt"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and adds bulk alongside a frailer support member."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and Steel and provides recovery with Water damage."
      }
    ]
  },
  "bronzong": {
    "evolution": [
      {
        "id": "bronzor",
        "condition": ""
      },
      {
        "id": "bronzong",
        "condition": "Level 33"
      }
    ],
    "partners": [
      {
        "id": "umbreon",
        "reason": "Resists Ghost and Dark and provides delayed recovery through Wish."
      },
      {
        "id": "milotic",
        "reason": "Resists Fire and adds special damage with direct recovery."
      }
    ]
  },
  "forretress": {
    "evolution": [
      {
        "id": "pineco",
        "condition": ""
      },
      {
        "id": "forretress",
        "condition": "Level 31"
      }
    ],
    "partners": [
      {
        "id": "milotic",
        "reason": "Resists Fire and provides recovery plus special Water attacks."
      },
      {
        "id": "houndoom",
        "reason": "Flash Fire normally grants Fire immunity and adds special pressure."
      }
    ]
  }
};
