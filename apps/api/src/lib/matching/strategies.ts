import type { ScoringStrategy, ScoringContext, ScoringResult } from './types';
import type { LanguageId } from '@lunajoy/shared';

/**
 * Language matching strategy - scores based on language compatibility
 */
class LanguageMatchingStrategy implements ScoringStrategy {
    name = 'language_matching';

    calculate(context: ScoringContext): ScoringResult {
        const { patient, clinician } = context;

        if (clinician.languages.includes(patient.language as LanguageId)) {
            return {
                score: 10,
                attributes: ['language_match'],
                explanation: `Speaks ${patient.language}`,
            };
        }

        return {
            score: 0,
            attributes: [],
            explanation: '',
        };
    }
}

/**
 * Gender preference strategy - scores based on gender preference match
 */
class GenderPreferenceStrategy implements ScoringStrategy {
    name = 'gender_preference';

    calculate(context: ScoringContext): ScoringResult {
        const { patient, clinician } = context;

        if (patient.gender_preference === null || patient.gender_preference === 'no_preference') {
            return {
                score: 0,
                attributes: [],
                explanation: '',
            };
        }

        if (clinician.gender === patient.gender_preference) {
            return {
                score: 8,
                attributes: ['gender_preference_match'],
                explanation: `Matches gender preference (${patient.gender_preference})`,
            };
        }

        return {
            score: 0,
            attributes: [],
            explanation: '',
        };
    }
}

/**
 * Clinical needs strategy - scores based on specialty overlap
 */
class ClinicalNeedsStrategy implements ScoringStrategy {
    name = 'clinical_needs';

    calculate(context: ScoringContext): ScoringResult {
        const { patient, clinician } = context;

        if (!patient.clinical_needs || patient.clinical_needs.length === 0) {
            return {
                score: 0,
                attributes: [],
                explanation: '',
            };
        }

        const matchingSpecialties = patient.clinical_needs.filter(need =>
            clinician.specialties.includes(need)
        );

        if (matchingSpecialties.length === 0) {
            return {
                score: 0,
                attributes: [],
                explanation: '',
            };
        }

        const matchPercentage = matchingSpecialties.length / patient.clinical_needs.length;
        const baseScore = 15;
        const score = Math.round(baseScore * matchPercentage);

        return {
            score,
            attributes: matchingSpecialties.map(specialty => `${specialty}_specialty`),
            explanation: `Specializes in ${matchingSpecialties.join(', ')}`,
        };
    }
}

/**
 * Time slot availability strategy - scores based on scheduling compatibility
 */
class TimeSlotAvailabilityStrategy implements ScoringStrategy {
    name = 'time_slot_availability';

    calculate(context: ScoringContext): ScoringResult {
        const { patient, clinician } = context;

        const matchingSlots = patient.preferred_availability.filter(slot =>
            clinician.available_slots.includes(slot)
        );

        if (matchingSlots.length === 0) {
            return {
                score: 0,
                attributes: [],
                explanation: '',
            };
        }

        const baseScore = patient.immediate_availability_required ? 20 : 12;
        const matchPercentage = matchingSlots.length / patient.preferred_availability.length;
        const score = Math.round(baseScore * matchPercentage);

        return {
            score,
            attributes: matchingSlots.map(slot => `${slot}_availability`),
            explanation: `Available during ${matchingSlots.join(', ')}`,
        };
    }
}

/**
 * Load balancing strategy - scores based on current workload
 */
class LoadBalancingStrategy implements ScoringStrategy {
    name = 'load_balancing';

    calculate(context: ScoringContext): ScoringResult {
        const { clinician, allClinicians } = context;

        if (allClinicians.length === 0) {
            return {
                score: 0,
                attributes: [],
                explanation: '',
            };
        }

        const averageLoad = allClinicians.reduce((sum, c) => sum + c.current_load, 0) / allClinicians.length;
        const maxLoad = Math.max(...allClinicians.map(c => c.current_load));

        if (maxLoad === 0) {
            return {
                score: 5,
                attributes: ['balanced_load'],
                explanation: 'Available for new patients',
            };
        }

        // Higher score for lower load relative to average
        const loadRatio = clinician.current_load / (averageLoad || 1);
        const score = Math.round(10 * (1 - Math.min(loadRatio, 1)));

        const attributes = score > 5 ? ['low_session_load'] : [];
        const explanation = score > 5 ? 'Has capacity for new patients' : '';

        return {
            score,
            attributes,
            explanation,
        };
    }
}

/**
 * Urgency level strategy - prioritizes based on patient urgency
 */
class UrgencyLevelStrategy implements ScoringStrategy {
    name = 'urgency_level';

    calculate(context: ScoringContext): ScoringResult {
        const { patient, clinician } = context;

        if (patient.immediate_availability_required) {
            // Prioritize clinicians with immediate availability slots
            const hasImmediateSlots = clinician.available_slots.some(slot =>
                ['morning', 'afternoon'].includes(slot)
            );

            if (hasImmediateSlots) {
                return {
                    score: 15,
                    attributes: ['immediate_availability'],
                    explanation: 'Available for immediate appointments',
                };
            }
        }

        return {
            score: 0,
            attributes: [],
            explanation: '',
        };
    }
}

/**
 * Strategy factory for creating and managing scoring strategies
 */
export class ScoringStrategyFactory {
    private strategies: Map<string, ScoringStrategy> = new Map();

    constructor() {
        const defaultStrategies = [
            new LanguageMatchingStrategy(),
            new GenderPreferenceStrategy(),
            new ClinicalNeedsStrategy(),
            new TimeSlotAvailabilityStrategy(),
            new LoadBalancingStrategy(),
            new UrgencyLevelStrategy(),
        ];

        defaultStrategies.forEach(strategy => {
            this.strategies.set(strategy.name, strategy);
        });
    }

    /**
     * Register a new scoring strategy
     */
    registerStrategy(strategy: ScoringStrategy): void {
        this.strategies.set(strategy.name, strategy);
    }

    /**
     * Get a strategy by name
     */
    getStrategy(name: string): ScoringStrategy | undefined {
        return this.strategies.get(name);
    }

    /**
     * Get all registered strategies
     */
    getAllStrategies(): ScoringStrategy[] {
        return Array.from(this.strategies.values());
    }

    /**
     * Get strategies by names
     */
    getStrategies(names: string[]): ScoringStrategy[] {
        return names
            .map(name => this.strategies.get(name))
            .filter((strategy): strategy is ScoringStrategy => strategy !== undefined);
    }
} 