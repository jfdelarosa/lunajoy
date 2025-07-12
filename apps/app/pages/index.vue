<script setup lang="ts">
import { useStepper } from '@/composables/useStepper'
import StartStep from '@/components/wizzard/start.vue'
import ProfileStep from '@/components/wizzard/profile.vue'
import PreferencesStep from '@/components/wizzard/preferences.vue'

// Define wizard steps
const steps = [
    {
        id: 'start',
        title: 'Getting Started',
        description: 'Welcome to LunaJoy'
    },
    {
        id: 'profile',
        title: 'Profile',
        description: 'Basic information'
    },
    {
        id: 'preferences',
        title: 'Preferences',
        description: 'Your preferences'
    }
]

// Initialize stepper with step names
const stepNames = steps.map(step => step.id)
const stepper = useStepper(stepNames, 'start')

// Handle wizard navigation
const handlePrevious = () => {
    stepper.goToPrevious()
}

const handleNext = () => {
    stepper.goToNext()
}

const handleStepChange = (stepIndex: number) => {
    stepper.goTo(stepNames[stepIndex])
}

// Get current step index for the wizard component
const currentStepIndex = computed(() => stepper.index.value)
</script>

<template>
    <div class="min-h-screen bg-base-200 py-8">
        <div class="container mx-auto px-4">
            <UiWizard :steps="steps" :current-step="currentStepIndex" @previous="handlePrevious" @next="handleNext"
                @step-change="handleStepChange">
                <template #default="{ currentStep, step }">
                    <!-- Start Step -->
                    <StartStep v-if="step.id === 'start'" @previous="handlePrevious" @next="handleNext" />

                    <!-- Profile Step -->
                    <ProfileStep v-else-if="step.id === 'profile'" @previous="handlePrevious" @next="handleNext" />

                    <!-- Preferences Step -->
                    <PreferencesStep v-else-if="step.id === 'preferences'" @previous="handlePrevious"
                        @next="handleNext" />

                    <!-- Fallback -->
                    <div v-else class="text-center">
                        <h2 class="text-2xl font-bold mb-4">Step not found</h2>
                        <p class="text-base-content/70">
                            The current step "{{ step.id }}" is not implemented yet.
                        </p>
                    </div>
                </template>
            </UiWizard>
        </div>
    </div>
</template>