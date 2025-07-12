<script setup lang="ts">
import { Heart, Pill, ShieldCheck } from 'lucide-vue-next'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { updateCareType } = useAppState()

const appointmentTypes = [
    {
        name: 'Therapy',
        value: 'THERAPY',
        icon: Heart,
        description: 'Talk therapy sessions with a licensed therapist',
    },
    {
        name: 'Medication Management',
        value: 'MEDICATION',
        icon: Pill,
        description: 'Psychiatric evaluation and medication management',
    }
]

function handleCareTypeChange(type: string) {
    updateCareType({
        appointment_type: type,
    })

    emit('next')
}
</script>

<template>
    <div>
        <div class="card bg-white shadow-xl border border-base-300">
            <div class="card-body p-8">
                <div class="text-center mb-6">
                    <div class="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Heart class="w-6 h-6 text-primary" />
                    </div>
                    <h2 class="text-xl font-semibold text-base-content mb-2">
                        What type of care are you looking for?
                    </h2>
                    <p class="text-base-content/70">
                        Choose the type of mental health support that best fits your needs
                    </p>
                </div>


                <div class="grid grid-cols-2 gap-6">
                    <button v-for="type in appointmentTypes" :key="type.value" @click="handleCareTypeChange(type.value)"
                        class="bg-white space-y-2 items-start p-4 border border-base-200 hover:border-primary hover:bg-primary/5 rounded-lg cursor-pointer hover:bg-base-50 gap-4 transition-colors text-left">
                        <component :is="type.icon" class="size-8 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <div class="font-semibold text-base-content text-lg">{{ type.name }}</div>
                            <div class="text-base text-base-content/70 tracking-tight">{{ type.description }}</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>