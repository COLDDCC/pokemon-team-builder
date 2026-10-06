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
        "reason": "Corviknight is immune to Ground, Pikachu\u2019s only type weakness. Pikachu threatens Water targets for it. Both still need a plan for strong Fire attackers."
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
        "reason": "Gastrodon resists Rock and is immune to Electric, covering two Charizard weaknesses. Charizard resists Grass 4\u00d7, helping with Gastrodon\u2019s 4\u00d7 Grass weakness."
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
        "reason": "Scizor resists Ice, Dragon and Fairy. Dragonite resists Fire for Scizor\u2019s 4\u00d7 Fire weakness; preserve its HP before relying on that switch."
      },
      {
        "id": "gastrodon",
        "reason": "Gastrodon resists Rock and is immune to Electric. Dragonite resists Grass 4\u00d7 for Gastrodon. Gastrodon takes neutral Ice damage, so add a true Ice resistance."
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
        "reason": "Gyarados is immune to Ground and resists Fire and Fighting, covering all Lucario type weaknesses. Its own 4\u00d7 Electric weakness still needs an answer."
      },
      {
        "id": "slowbro",
        "reason": "Slowbro resists Fire and Fighting and supplies physical bulk. Lucario resists Dark, Grass and Bug for Slowbro, but neither is immune to Ground."
      }
    ]
  }
};
