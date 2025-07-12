export const AppointmentType = ['therapy', 'psychiatry', 'both'] as const
export const GenderPreference = ['male', 'female', 'non-binary', 'other', 'no_preference'] as const

export type PatientIntakeState = {
    state?: string
    language?: string
    gender_preference?: (typeof GenderPreference)[number]
    appointment_type?: (typeof AppointmentType)[number]
    clinical_needs: string[]
    insurance?: string
    preferred_availability: string[]
    immediate_availability_required?: boolean
} 