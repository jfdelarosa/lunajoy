import type { PatientIntake } from '@lunajoy/shared'
import type { InferResponseType } from "hono/client";

const state = ref<PatientIntake>({
    state: undefined,
    language: "EN",
    gender_preference: 'no_preference',
    appointment_type: "THERAPY",
    clinical_needs: [],
    insurance: undefined,
    preferred_availability: [],
    immediate_availability_required: false,
})

type MatchApiResponse = InferResponseType<typeof apiClient.api.clinicians.$get, 200>

const apiClient = useApiClient()
const results = ref<MatchApiResponse>([])
const showResults = ref(false)

export default function useAppState() {

    // Profile step methods
    const updateProfile = (data: Pick<PatientIntake, | 'state' | 'language'>) => {
        console.log({ data })

        state.value = {
            ...state.value,
            state: data.state,
            language: data.language,
        }
    }

    // Care type step methods
    const updateCareType = (data: Pick<PatientIntake, 'appointment_type'>) => {
        state.value = {
            ...state.value,
            appointment_type: data.appointment_type,
        }
    }

    // Clinical needs step methods
    const updateClinicalNeeds = (data: Pick<PatientIntake, 'clinical_needs'>) => {
        state.value = {
            ...state.value,
            clinical_needs: data.clinical_needs,
        }
    }

    // Preferences step methods
    const updatePreferences = (data: Pick<PatientIntake, 'gender_preference' | 'insurance'>) => {
        state.value = {
            ...state.value,
            gender_preference: data.gender_preference,
            insurance: data.insurance,
        }
    }

    // Availability step methods
    const updateAvailability = (data: Pick<PatientIntake, 'preferred_availability'>) => {
        state.value = {
            ...state.value,
            preferred_availability: data.preferred_availability,
        }
    }

    // Set results and show results view
    const setResults = (matchResponse: MatchApiResponse) => {
        results.value = matchResponse
        showResults.value = true
    }

    // Reset all state
    const resetState = () => {
        state.value = {
            state: undefined,
            language: "EN", // Using shared constant key
            gender_preference: 'no_preference',
            appointment_type: "THERAPY",
            clinical_needs: [],
            insurance: undefined,
            preferred_availability: [],
            immediate_availability_required: false,
        }
    }

    // Reset everything including results
    const resetAll = () => {
        resetState()
        results.value = []
        showResults.value = false
    }

    return {
        state: readonly(state),
        results: readonly(results),
        showResults: readonly(showResults),
        updateProfile,
        updateCareType,
        updateClinicalNeeds,
        updatePreferences,
        updateAvailability,
        setResults,
        resetState,
        resetAll,
    }
}