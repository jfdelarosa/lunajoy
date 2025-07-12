import { STATES, LANGUAGES, INSURANCES, SPECIALTIES, TIME_SLOTS, GENDERS, APPOINTMENT_TYPES, WIZARD_STEPS } from './constants';

// Type definitions for IDs
export type StateId = keyof typeof STATES;
export type LanguageId = keyof typeof LANGUAGES;
export type InsuranceId = keyof typeof INSURANCES;
export type SpecialtyId = keyof typeof SPECIALTIES;
export type TimeSlotId = keyof typeof TIME_SLOTS;
export type GenderId = keyof typeof GENDERS;
export type AppointmentTypeId = keyof typeof APPOINTMENT_TYPES;
export type WizardStepId = keyof typeof WIZARD_STEPS;

// Type definitions for values
export type StateName = typeof STATES[StateId];
export type LanguageName = typeof LANGUAGES[LanguageId];
export type InsuranceName = typeof INSURANCES[InsuranceId];
export type SpecialtyName = typeof SPECIALTIES[SpecialtyId];
export type TimeSlotName = typeof TIME_SLOTS[TimeSlotId];
export type GenderName = typeof GENDERS[GenderId];
export type AppointmentTypeName = typeof APPOINTMENT_TYPES[AppointmentTypeId];
export type WizardStepName = typeof WIZARD_STEPS[WizardStepId];

// Gender preference includes the gender IDs plus additional options
export type GenderPreference = GenderId | 'other' | 'no_preference';

// Legacy type alias for backward compatibility
export type PatientIntakeState = {
    state?: StateId;
    language?: LanguageId;
    gender_preference?: GenderPreference;
    appointment_type?: AppointmentTypeId;
    clinical_needs: SpecialtyId[];
    insurance?: InsuranceId;
    preferred_availability: TimeSlotId[];
    immediate_availability_required?: boolean;
};

// Legacy type alias for backward compatibility
export type MatchRequest = PatientIntakeState;

// Note: Clinician and MatchResponse types are now defined in schemas.ts and exported from there
// This ensures the Zod schemas are the source of truth for these types 