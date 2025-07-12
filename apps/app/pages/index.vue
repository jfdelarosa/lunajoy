<script setup lang="ts">
import { useStepper } from '@/composables/useStepper'
import StartStep from '@/components/wizzard/start.vue'
import ProfileStep from '@/components/wizzard/profile.vue'
import CareTypeStep from '@/components/wizzard/care-type.vue'
import ClinicalNeedsStep from '@/components/wizzard/clinical-needs.vue'
import PreferencesStep from '@/components/wizzard/preferences.vue'
import AvailabilityStep from '@/components/wizzard/availability.vue'
import type { AppointmentType, GenderPreference } from '@/types'

const apiClient = useApiClient()
const { state } = useAppState()

// Define wizard steps
const steps = [
    {
        id: 'start',
        title: 'Getting Started',
        description: 'Welcome to LunaJoy',
        component: StartStep
    },
    {
        id: 'profile',
        title: 'Profile',
        description: 'Basic information',
        component: ProfileStep
    },
    {
        id: 'care-type',
        title: 'Care Type',
        description: 'Type of care needed',
        component: CareTypeStep
    },
    {
        id: 'clinical-needs',
        title: 'Clinical Needs',
        description: 'Areas to work on',
        component: ClinicalNeedsStep
    },
    {
        id: 'preferences',
        title: 'Preferences',
        description: 'Provider preferences',
        component: PreferencesStep
    },
    {
        id: 'availability',
        title: 'Availability',
        description: 'When to meet',
        component: AvailabilityStep
    }
]

// Initialize stepper with step names
const stepNames = steps.map(step => step.id)
const stepper = useStepper(stepNames, 'start')

// Filter steps based on appointment type
const filteredSteps = computed(() => {
    if (state.value.appointment_type === 'psychiatry') {
        // Skip clinical-needs step for psychiatry appointments
        return steps.filter(step => step.id !== 'clinical-needs')
    }
    return steps
})

// Handle wizard navigation
function handlePrevious() {
    stepper.goToPrevious()
}

async function handleNext() {
    if (stepper.isLast.value) {
        const response = await apiClient.api.match.$post({
            json: {
                appointment_type: state.value.appointment_type as (typeof AppointmentType)[number],
                state: state.value.state,
                language: state.value.language,
                gender_preference: state.value.gender_preference as (typeof GenderPreference)[number],
                clinical_needs: state.value.clinical_needs as string[],
                insurance: state.value.insurance,
                preferred_availability: state.value.preferred_availability as string[],
            }
        })

        const clinicians = await response.json()

        console.log(clinicians)

        return
    }

    stepper.goToNext()
}

function handleStepChange(stepIndex: number) {
    stepper.goTo(stepNames[stepIndex])
}

// Get current step index for the wizard component
const currentStepIndex = computed(() => stepper.index.value)
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