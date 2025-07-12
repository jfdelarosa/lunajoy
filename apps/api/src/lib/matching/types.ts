import type { PatientIntake, Clinician } from '@lunajoy/shared';

export interface MatchedClinician extends Clinician {
    matching_score: number;
    explanation: string;
    overlapping_attributes: string[];
}

export interface ScoringContext {
    patient: PatientIntake;
    clinician: Clinician;
    allClinicians: Clinician[];
}

export interface ScoringResult {
    score: number;
    attributes: string[];
    explanation: string;
}

export interface ScoringStrategy {
    name: string;
    calculate(context: ScoringContext): ScoringResult;
}

export interface WeightConfig {
    [strategyName: string]: number;
}

export interface ScoringConfig {
    weights: WeightConfig;
    maxResults: number;
}

// Hard constraint filter types
export interface HardConstraintFilter {
    name: string;
    passes(patient: PatientIntake, clinician: Clinician): boolean;
}

export interface FilteringResult {
    passed: boolean;
    failedFilters: string[];
} 