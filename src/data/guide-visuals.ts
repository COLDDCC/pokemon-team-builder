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
  }
};
