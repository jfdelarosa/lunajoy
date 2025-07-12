import type { ScoringConfig, WeightConfig } from './types';

/**
 * Default weight configuration for scoring strategies
 * Higher weights give more importance to that scoring factor
 */
export const DEFAULT_WEIGHTS: WeightConfig = {
    language_matching: 0.5,           // Language compatibility (reduced since it's now a hard constraint)
    gender_preference: 0.8,           // Gender preference match
    clinical_needs: 1.2,              // Clinical specialty overlap
    time_slot_availability: 1.1,      // Schedule compatibility
    load_balancing: 0.9,              // Workload distribution
    urgency_level: 1.3,               // Urgency prioritization
};

/**
 * Default scoring configuration
 */
export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
    weights: DEFAULT_WEIGHTS,
    maxResults: 10,
};


