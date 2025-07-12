<script setup lang="ts">
import { useStepper } from '@/composables/useStepper'
import StartStep from '@/components/wizzard/start.vue'
import ProfileStep from '@/components/wizzard/profile.vue'
import CareTypeStep from '@/components/wizzard/care-type.vue'
import ClinicalNeedsStep from '@/components/wizzard/clinical-needs.vue'
import PreferencesStep from '@/components/wizzard/preferences.vue'
import AvailabilityStep from '@/components/wizzard/availability.vue'
import type { GenderPreference } from '@lunajoy/shared'
import { APPOINTMENT_TYPES, WIZARD_STEPS, WIZARD_STEP_CONFIG } from '@lunajoy/shared'

const { state, resetAll } = useAppState()
const router = useRouter()

// Define wizard steps using shared constants
const steps = [
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.START],
        component: StartStep
    },
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.PROFILE],
        component: ProfileStep
    },
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.CARE_TYPE],
        component: CareTypeStep
    },
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.CLINICAL_NEEDS],
        component: ClinicalNeedsStep
    },
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.PREFERENCES],
        component: PreferencesStep
    },
    {
        ...WIZARD_STEP_CONFIG[WIZARD_STEPS.AVAILABILITY],
        component: AvailabilityStep
    }
]

// Initialize stepper with step names
const stepNames = steps.map(step => step.id)
const stepper = useStepper(stepNames, WIZARD_STEPS.START)

// Filter steps based on appointment type
const filteredSteps = computed(() => {
    if (state.value.appointment_type === 'MEDICATION') {
        // Skip clinical-needs step for medication appointments
        return steps.filter(step => step.id !== WIZARD_STEPS.CLINICAL_NEEDS)
    }
    return steps
})

// Handle wizard navigation
function handlePrevious() {
    stepper.goToPrevious()
}

async function handleNext() {
    if (stepper.isLast.value) {
        if (!state.value.appointment_type) {
            console.error('Appointment type is required')
            return
        }

        // Redirect to match page with query parameters
        const queryParams = new URLSearchParams({
            appointment_type: state.value.appointment_type,
            state: state.value.state || '',
            language: state.value.language || '',
            gender_preference: state.value.gender_preference || '',
            insurance: state.value.insurance || ''
        })

        // Add array parameters
        if (state.value.clinical_needs && state.value.clinical_needs.length > 0) {
            state.value.clinical_needs.forEach(need => {
                queryParams.append('clinical_needs', need)
            })
        }

        if (state.value.preferred_availability && state.value.preferred_availability.length > 0) {
            state.value.preferred_availability.forEach(availability => {
                queryParams.append('preferred_availability', availability)
            })
        }

        router.push(`/match?${queryParams.toString()}`)
        return
    }

    stepper.goToNext()
}

function handleStepChange(stepIndex: number) {
    stepper.goTo(stepNames[stepIndex])
}

// Get current step index for the wizard component
const currentStepIndex = computed(() => stepper.index.value)

// Handle reset functionality
const handleReset = () => {
    resetAll()
    stepper.goTo(WIZARD_STEPS.START)
}
</script>

<template>
    <div class="min-h-screen bg-base-200 py-8">
        <div class="container mx-auto px-4">
            <UiWizard :steps="filteredSteps" :current-step="currentStepIndex" @previous="handlePrevious"
                @next="handleNext" @step-change="handleStepChange">
                <template #default="{ step }">
                    <component :is="step.component" @previous="handlePrevious" @next="handleNext" />
                </template>
            </UiWizard>
        </div>
    </div>
</template>