<script setup lang="ts">
import { Clock, Sun, Sunset, Moon, Calendar } from 'lucide-vue-next'
import { getTimeSlotOptions } from '@lunajoy/shared'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { state, updateAvailability } = useAppState()

const formData = ref({
    preferred_availability: [...(state.value?.preferred_availability || [])],
})

// Watch for changes and update state
watch(formData, (newData) => {
    updateAvailability({
        preferred_availability: newData.preferred_availability
    })
}, { deep: true })

const timeSlots = [
    {
        name: 'Morning',
        value: 'MOR',
        icon: Sun,
        description: '8 AM - 12 PM',
        timeRange: 'Early start to your day'
    },
    {
        name: 'Afternoon',
        value: 'AFT',
        icon: Sun,
        description: '12 PM - 5 PM',
        timeRange: 'Midday appointments'
    },
    {
        name: 'Evening',
        value: 'EVE',
        icon: Sunset,
        description: '5 PM - 8 PM',
        timeRange: 'After work hours'
    },
    {
        name: 'Late Evening',
        value: 'LATE',
        icon: Moon,
        description: '8 PM - 10 PM',
        timeRange: 'Later in the evening'
    },
    {
        name: 'Weekend',
        value: 'WKND',
        icon: Calendar,
        description: 'Saturday & Sunday',
        timeRange: 'Weekend availability'
    },
]

const isFormValid = computed(() => {
    return formData.value.preferred_availability.length > 0
})

const toggleTimeSlot = (value: string) => {
    const index = formData.value.preferred_availability.indexOf(value)
    if (index > -1) {
        formData.value.preferred_availability.splice(index, 1)
    } else {
        formData.value.preferred_availability.push(value)
    }
}

const handleNext = () => {
    console.log(formData.value)
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
                    <Clock class="w-6 h-6 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-2">
                    When would you like to meet?
                </h2>
                <p class="text-base-content/70">
                    Select all time slots that work for you. We'll find providers with matching availability.
                </p>
            </div>

            <!-- Time Slots -->
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Preferred appointment times</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label v-for="slot in timeSlots" :key="slot.value"
                        class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-base-50 transition-colors"
                        :class="{ 'border-primary bg-primary/5': formData.preferred_availability.includes(slot.value) }">
                        <input type="checkbox" :value="slot.value"
                            :checked="formData.preferred_availability.includes(slot.value)"
                            @change="toggleTimeSlot(slot.value)" class="checkbox checkbox-primary mr-4" />
                        <component :is="slot.icon" class="w-5 h-5 text-primary mr-3" />
                        <div>
                            <div class="font-medium text-base-content">{{ slot.name }}</div>
                            <div class="text-sm text-base-content/60">{{ slot.description }}</div>
                            <div class="text-xs text-base-content/50">{{ slot.timeRange }}</div>
                        </div>
                    </label>
                </div>
            </fieldset>

            <!-- Navigation -->
            <div class="flex justify-between items-center mt-8">
                <button class="btn btn-ghost" @click="emit('previous')">
                    Back
                </button>
                <button class="btn btn-primary" :disabled="!isFormValid" @click="handleNext">
                    Find My Matches
                </button>
            </div>
        </div>
    </div>
</template>