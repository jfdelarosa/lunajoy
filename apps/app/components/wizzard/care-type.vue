<script setup lang="ts">
import { Brain, Pill, Clock, AlertCircle, Calendar } from 'lucide-vue-next'
import type { PatientIntakeState } from '~/types'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { state, updateCareType } = useAppState()

const formData = ref({
    appointment_type: state.value?.appointment_type || '',
    urgency_level: 'medium', // Default urgency level
})

// Watch for changes and update state
watch(formData, (newData) => {
    const immediate_availability_required = newData.urgency_level === 'urgent'
    updateCareType({
        appointment_type: newData.appointment_type as PatientIntakeState['appointment_type'],
        immediate_availability_required
    })
}, { deep: true })

const appointmentTypes = [
    {
        name: 'Therapy',
        value: 'therapy',
        icon: Brain,
        description: 'Talk therapy, counseling, or psychotherapy sessions'
    },
    {
        name: 'Medication Management',
        value: 'psychiatry',
        icon: Pill,
        description: 'Psychiatric evaluation and medication management'
    },
    {
        name: 'Both',
        value: 'both',
        icon: Calendar,
        description: 'I need both therapy and medication management'
    },
]

const urgencyLevels = [
    {
        name: 'Within 24 hours',
        value: 'urgent',
        icon: AlertCircle,
        description: 'I need immediate help',
        color: 'text-red-500'
    },
    {
        name: 'Within this week',
        value: 'high',
        icon: Clock,
        description: 'It\'s important but not an emergency',
        color: 'text-orange-500'
    },
    {
        name: 'Within a month',
        value: 'medium',
        icon: Calendar,
        description: 'I can wait but would prefer sooner',
        color: 'text-yellow-500'
    },
    {
        name: 'No rush',
        value: 'low',
        icon: Calendar,
        description: 'I have flexibility with timing',
        color: 'text-green-500'
    },
]

const isFormValid = computed(() => {
    return formData.value.appointment_type !== '' && formData.value.urgency_level !== ''
})

const handleNext = () => {
    if (isFormValid.value) {
        emit('next')
    }
}
</script>

<template>
    <div class="card bg-white shadow-xl border border-base-300">
        <div class="card-body p-8">
            <!-- Header -->
            <div class="text-center mb-6">
                <div class="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Brain class="w-6 h-6 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-2">
                    What kind of care do you need?
                </h2>
                <p class="text-base-content/70">
                    This helps us find the right type of mental health professional for you
                </p>
            </div>

            <!-- Form -->
            <div class="space-y-8">
                <!-- Appointment Type -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Type of care</legend>
                    <div class="grid grid-cols-3 gap-3">
                        <label v-for="type in appointmentTypes" :key="type.value"
                            class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-base-50 transition-colors gap-4"
                            :class="{ 'border-primary bg-primary/5': formData.appointment_type === type.value }">
                            <input type="radio" :value="type.value" v-model="formData.appointment_type"
                                class="hidden" />
                            <component :is="type.icon" class="size-8 text-primary" />
                            <div class="flex-1">
                                <div class="font-medium text-base-content">{{ type.name }}</div>
                                <div class="text-sm text-base-content/70">{{ type.description }}</div>
                            </div>
                        </label>
                    </div>
                </fieldset>

                <!-- Urgency Level -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">How soon do you need care?</legend>
                    <div class="grid grid-cols-1 gap-3">
                        <label v-for="urgency in urgencyLevels" :key="urgency.value"
                            class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-base-50 transition-colors"
                            :class="{ 'border-primary bg-primary/5': formData.urgency_level === urgency.value }">
                            <input type="radio" :value="urgency.value" v-model="formData.urgency_level"
                                class="radio radio-primary mr-4" />
                            <component :is="urgency.icon" class="w-5 h-5 mr-3" :class="urgency.color" />
                            <div>
                                <div class="font-medium text-base-content">{{ urgency.name }}</div>
                                <div class="text-sm text-base-content/70">{{ urgency.description }}</div>
                            </div>
                        </label>
                    </div>
                </fieldset>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between items-center mt-8">
                <button class="btn btn-ghost" @click="emit('previous')">
                    Back
                </button>
                <button class="btn btn-primary" :disabled="!isFormValid" @click="handleNext">
                    Continue
                </button>
            </div>
        </div>
    </div>
</template>