import { z } from 'zod';
import { STATES, LANGUAGES, INSURANCES, SPECIALTIES, TIME_SLOTS, GENDERS, APPOINTMENT_TYPES } from './constants';

// Create enums directly from the constants
const StateEnum = z.enum(Object.keys(STATES) as [string, ...string[]]);
const LanguageEnum = z.enum(Object.keys(LANGUAGES) as [string, ...string[]]);
const InsuranceEnum = z.enum(Object.keys(INSURANCES) as [string, ...string[]]);
const SpecialtyEnum = z.enum(Object.keys(SPECIALTIES) as [string, ...string[]]);
const TimeSlotEnum = z.enum(Object.keys(TIME_SLOTS) as [string, ...string[]]);
const GenderEnum = z.enum(Object.keys(GENDERS) as [string, ...string[]]);
const AppointmentTypeEnum = z.enum(Object.keys(APPOINTMENT_TYPES) as [string, ...string[]]);

// Base clinician schema - the source of truth
export const ClinicianSchema = z.object({
    id: z.string().uuid(),
    avatar: z.string(),
    full_name: z.string(),
    gender: GenderEnum,
    languages: z.array(LanguageEnum),
    state: StateEnum,
    specialties: z.array(SpecialtyEnum),
    insurances: z.array(InsuranceEnum),
    appointment_types: z.array(AppointmentTypeEnum),
    available_slots: z.array(TimeSlotEnum),
    is_available: z.boolean(),
    current_load: z.number().nonnegative(),
    max_load: z.number().nonnegative(),
    accepts_medication: z.boolean(),
    accepts_therapy: z.boolean(),
});

// Extended schema for match results
export const MatchedClinicianSchema = ClinicianSchema.extend({
    matching_score: z.number(),
    explanation: z.string(),
    overlapping_attributes: z.array(z.string()),
});

// Patient intake schema
export const PatientIntakeSchema = z.object({
    state: StateEnum.optional(),
    language: LanguageEnum.optional(),
    gender_preference: z.enum(['M', 'F', 'NB', 'other', 'no_preference']).optional(),
    appointment_type: AppointmentTypeEnum,
    clinical_needs: z.array(SpecialtyEnum).optional(),
    insurance: InsuranceEnum.optional(),
    preferred_availability: z.array(TimeSlotEnum),
    immediate_availability_required: z.boolean().default(false),
});

// Match response schema
export const MatchResponseSchema = z.object({
    matches: z.array(MatchedClinicianSchema),
    total_matches: z.number(),
    request_id: z.string(),
    timestamp: z.string(),
});

// Export the inferred types
export type Clinician = z.infer<typeof ClinicianSchema>;
export type MatchedClinician = z.infer<typeof MatchedClinicianSchema>;
export type PatientIntake = z.infer<typeof PatientIntakeSchema>;
export type MatchResponse = z.infer<typeof MatchResponseSchema>; 