import type {
    MatchedClinician,
    ScoringConfig,
    ScoringContext
} from './types';
import type { PatientIntake, Clinician } from '@lunajoy/shared';
import { HardConstraintFilterManager } from './filters';
import { ScoringStrategyFactory } from './strategies';
import { DEFAULT_SCORING_CONFIG } from './config';
import cliniciansData from "@/data/clinicians.json";


/**
 * Weighted Scoring Engine for matching patients with clinicians
 * 
 * This engine follows a three-step process:
 * 1. Filter clinicians based on hard constraints
 * 2. Score filtered clinicians using weighted strategies
 * 3. Rank and return top matches
 */
export class WeightedScoringEngine {
    private filterManager: HardConstraintFilterManager;
    private strategyFactory: ScoringStrategyFactory;
    private config: ScoringConfig;

    constructor(config: ScoringConfig = DEFAULT_SCORING_CONFIG) {
        this.filterManager = new HardConstraintFilterManager();
        this.strategyFactory = new ScoringStrategyFactory();
        this.config = config;
    }

    getClinicians(): Clinician[] {
        const clinicians: Clinician[] = cliniciansData.map((clinician: any) => {
            return {
                ...clinician,
            };
        });

        return clinicians;
    }

    /**
     * Main method to match a patient with clinicians
     */
    async matchPatientToClinicians(
        patient: PatientIntake,
    ): Promise<MatchedClinician[]> {
        const availableClinicians = this.getClinicians();

        if (availableClinicians.length === 0) {
            return [];
        }

        // Step 1: Apply hard constraint filters
        const filteredClinicians = this.filterManager.filterClinicians(patient, availableClinicians);

        if (filteredClinicians.length === 0) {
            return [];
        }

        // Step 2: Score filtered clinicians
        const scoredClinicians = await this.scoreClinicians(patient, filteredClinicians, availableClinicians);

        // Step 3: Rank and return top matches
        return this.rankClinicians(scoredClinicians);
    }

    /**
     * Score clinicians using weighted strategies
     */
    private async scoreClinicians(
        patient: PatientIntake,
        clinicians: Clinician[],
        allClinicians: Clinician[]
    ): Promise<MatchedClinician[]> {
        const strategies = this.strategyFactory.getAllStrategies();

        return clinicians.map(clinician => {
            const context: ScoringContext = {
                patient,
                clinician,
                allClinicians,
            };

            let totalScore = 0;
            const allAttributes: string[] = [];
            const explanations: string[] = [];

            // Calculate weighted scores for each strategy
            for (const strategy of strategies) {
                const weight = this.config.weights[strategy.name] || 0;

                if (weight > 0) {
                    const result = strategy.calculate(context);
                    const weightedScore = result.score * weight;

                    totalScore += weightedScore;
                    allAttributes.push(...result.attributes);

                    if (result.explanation) {
                        explanations.push(result.explanation);
                    }
                }
            }

            // Round total score to 2 decimal places
            const finalScore = Math.round(totalScore * 100) / 100;

            // Create comprehensive explanation
            const explanation = explanations.length > 0
                ? `Best match: ${explanations.join(', ')}`
                : 'Meets basic requirements';

            return {
                ...clinician,
                matching_score: finalScore,
                explanation,
                overlapping_attributes: Array.from(new Set(allAttributes)), // Remove duplicates
            };
        });
    }

    /**
     * Rank clinicians by score and return top matches
     */
    private rankClinicians(clinicians: MatchedClinician[]): MatchedClinician[] {
        return clinicians
            .sort((a, b) => {
                // Primary sort by score (descending)
                if (b.matching_score !== a.matching_score) {
                    return b.matching_score - a.matching_score;
                }

                // Secondary sort by session load (ascending) for tie-breaking
                if (a.current_load !== b.current_load) {
                    return a.current_load - b.current_load;
                }

                // Tertiary sort by name for consistency
                return a.full_name.localeCompare(b.full_name);
            })
            .slice(0, this.config.maxResults);
    }
} 