import type { PatientIntakeState } from '~/types'

const state = ref<PatientIntakeState>({
    state: undefined,
    language: "en",
    gender_preference: 'no_preference',
    appointment_type: undefined,
    clinical_needs: [],
    insurance: undefined,
    preferred_availability: [],
    immediate_availability_required: false,
})

export default function useAppState() {

    // Profile step methods
    const updateProfile = (data: Pick<PatientIntakeState, | 'state' | 'language'>) => {
        console.log({ data })

        state.value = {
            ...state.value,
            state: data.state,
            language: data.language,
        }
    }

    // Care type step methods
    const updateCareType = (data: Pick<PatientIntakeState, 'appointment_type' | 'immediate_availability_required'>) => {
        state.value = {
            ...state.value,
            appointment_type: data.appointment_type,
            immediate_availability_required: data.immediate_availability_required,
        }
    }

    // Clinical needs step methods
    const updateClinicalNeeds = (data: Pick<PatientIntakeState, 'clinical_needs'>) => {
        state.value = {
            ...state.value,
            clinical_needs: data.clinical_needs,
        }
    }

    // Preferences step methods
    const updatePreferences = (data: Pick<PatientIntakeState, 'gender_preference' | 'insurance'>) => {
        state.value = {
            ...state.value,
            gender_preference: data.gender_preference,
            insurance: data.insurance,
        }
    }

    // Availability step methods
    const updateAvailability = (data: Pick<PatientIntakeState, 'preferred_availability'>) => {
        state.value = {
            ...state.value,
            preferred_availability: data.preferred_availability,
        }
    }

    // Reset all state
    const resetState = () => {
        state.value = {
            state: undefined,
            language: "en",
            gender_preference: 'no_preference',
            appointment_type: undefined,
            clinical_needs: [],
            insurance: undefined,
            preferred_availability: [],
            immediate_availability_required: false,
        }
    }

    return {
        state: readonly(state),
        updateProfile,
        updateCareType,
        updateClinicalNeeds,
        updatePreferences,
        updateAvailability,
        resetState,
    }
}