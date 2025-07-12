import type { HardConstraintFilter, FilteringResult } from './types';
import type { PatientIntake, Clinician, InsuranceId, LanguageId } from '@lunajoy/shared';

/**
 * State license filter - clinician must be located in patient's state
 */
export class StateLicenseFilter implements HardConstraintFilter {
    name = 'state_license';

    passes(patient: PatientIntake, clinician: Clinician): boolean {
        return clinician.state === patient.state;
    }
}

/**
 * Language matching filter - clinician must speak patient's language
 */
export class LanguageMatchingFilter implements HardConstraintFilter {
    name = 'language_matching';

    passes(patient: PatientIntake, clinician: Clinician): boolean {
        if (!patient.language) {
            return true; // If no language preference, pass all clinicians
        }
        return clinician.languages.includes(patient.language as LanguageId);
    }
}

/**
 * Insurance provider filter - clinician must accept patient's insurance
 */
export class InsuranceProviderFilter implements HardConstraintFilter {
    name = 'insurance_provider';

    passes(patient: PatientIntake, clinician: Clinician): boolean {
        return clinician.insurances.includes(patient.insurance as InsuranceId);
    }
}

/**
 * Appointment type filter - clinician must support the requested appointment type
 */
export class AppointmentTypeFilter implements HardConstraintFilter {
    name = 'appointment_type';

    passes(patient: PatientIntake, clinician: Clinician): boolean {
        if (patient.appointment_type === 'MEDICATION') {
            return clinician.accepts_medication;
        }
        // For therapy, all clinicians can provide therapy (this is the default assumption)
        return true;
    }
}

/**
 * Filter manager that applies all hard constraint filters
 */
export class HardConstraintFilterManager {
    private filters: HardConstraintFilter[] = [
        new StateLicenseFilter(),
        new LanguageMatchingFilter(),
        new InsuranceProviderFilter(),
        new AppointmentTypeFilter(),
    ];

    /**
     * Add a new filter to the manager
     */
    addFilter(filter: HardConstraintFilter): void {
        this.filters.push(filter);
    }

    /**
     * Remove a filter by name
     */
    removeFilter(filterName: string): void {
        this.filters = this.filters.filter(f => f.name !== filterName);
    }

    /**
     * Check if a clinician passes all hard constraints
     */
    passesAllFilters(patient: PatientIntake, clinician: Clinician): FilteringResult {
        const failedFilters: string[] = [];

        for (const filter of this.filters) {
            if (!filter.passes(patient, clinician)) {
                failedFilters.push(filter.name);
            }
        }

        return {
            passed: failedFilters.length === 0,
            failedFilters,
        };
    }

    /**
     * Filter a list of clinicians based on hard constraints
     */
    filterClinicians(patient: PatientIntake, clinicians: Clinician[]): Clinician[] {
        return clinicians.filter(clinician =>
            this.passesAllFilters(patient, clinician).passed
        );
    }
} 