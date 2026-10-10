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
        "reason": "Corviknight is immune to Ground, Pikachu’s only type weakness. Pikachu threatens Water targets for it. Both still need a plan for strong Fire attackers."
      },
      {
        "id": "gastrodon",
        "reason": "Gastrodon resists Fire and Rock and provides a sturdier option. Pikachu pressures Water targets, while its Electric typing resists neither Ground nor Grass: add a Grass answer."
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
        "reason": "Gastrodon resists Rock and is immune to Electric, covering two Charizard weaknesses. Charizard resists Grass 4×, helping with Gastrodon’s 4× Grass weakness."
      },
      {
        "id": "corviknight",
        "reason": "Corviknight takes neutral Rock damage, not resisted damage, and resists Dragon and Fairy. Both are weak to Electric; pair them with an Electric immunity such as Gastrodon."
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
        "reason": "Corviknight resists Fairy and Dragon and is immune to Ground. Ice damage is neutral, so do not treat it as an Ice resistance. Garchomp is immune to its Electric weakness."
      },
      {
        "id": "azumarill",
        "reason": "Azumarill resists Ice and is immune to Dragon. Garchomp covers its Electric weakness, but neither resists Fairy; add a Steel teammate for that matchup."
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
        "reason": "Corviknight is immune to Ground and resists Psychic, covering two Gengar weaknesses. Gengar can pressure some Fairy targets, but both still need help against Fire coverage."
      },
      {
        "id": "clefable",
        "reason": "Clefable resists Dark for Gengar. Gengar resists Poison for Clefable, but the pair still needs a Ground answer and a teammate that can handle Steel targets."
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
        "reason": "Scizor resists Ice, Dragon and Fairy. Dragonite resists Fire for Scizor’s 4× Fire weakness; preserve its HP before relying on that switch."
      },
      {
        "id": "gastrodon",
        "reason": "Gastrodon resists Rock and is immune to Electric. Dragonite resists Grass 4× for Gastrodon. Gastrodon takes neutral Ice damage, so add a true Ice resistance."
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
        "reason": "Gyarados is immune to Ground and resists Fire and Fighting, covering all Lucario type weaknesses. Its own 4× Electric weakness still needs an answer."
      },
      {
        "id": "slowbro",
        "reason": "Slowbro resists Fire and Fighting and supplies physical bulk. Lucario resists Dark, Grass and Bug for Slowbro, but neither is immune to Ground."
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
  }
};
