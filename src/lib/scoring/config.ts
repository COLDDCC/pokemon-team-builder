export const scoringConfig = {
  version: '1.0',
  weights: { offense: 0.25, defense: 0.30, coverage: 0.25, synergy: 0.20 },
  offense: { neutralCoverageWeight: 0.55, attackingStatsWeight: 0.45, attackStatScale: 150 },
  defense: { resistanceWeight: 0.40, safetyWeight: 0.60, unprotectedWeaknessPenalty: 0.7, repeatedWeaknessPenalty: 0.35, quadruplePenalty: 0.45 },
  synergy: { rescueWeight: 0.65, roleWeight: 0.25, speedWeight: 0.10, fastSpeed: 100, bulkyTotal: 270, roleCoverageCount: 3 },
  ratings: { excellent: 80, good: 65, fair: 45 },
  maxTeamSize: 6, maxInsights: 6,
} as const;
