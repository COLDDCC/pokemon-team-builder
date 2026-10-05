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
        "reason": "Resists Grass; Blastoise resists Scizor\u2019s Fire weakness."
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
        "reason": "Resists Fighting and avoids sand damage through Steel typing."
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
        "condition": "High friendship + level up at night; avoid meeting Sylveon\u2019s conditions"
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
  }
};
