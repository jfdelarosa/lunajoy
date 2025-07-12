<script setup lang="ts">
import type { InferResponseType } from "hono/client";

const apiClient = useApiClient()

interface Props {
    results: InferResponseType<typeof apiClient.api.match.$post, 200>
}

defineProps<Props>()

const emit = defineEmits<{
    reset: []
}>()

const handleReset = () => {
    emit('reset')
}

</script>

<template>
    <div class="min-h-screen bg-base-200 py-8">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-base-content mb-2">Your Matched Clinicians</h1>
                <p class="text-base-content/70">
                    We found {{ results.length }} clinician{{ results.length !== 1 ? 's' : '' }}
                    that match your preferences
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div v-for="clinician in results" :key="clinician.id"
                    class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="card-body">
                        <!-- Clinician Header -->
                        <div class="flex items-start gap-4 mb-4">
                            <div class="avatar">
                                <div class="w-16 h-16 rounded-full">
                                    <img :src="clinician.avatar" :alt="clinician.full_name" />
                                </div>
                            </div>
                            <div class="flex-1">
                                <h3 class="card-title text-lg">{{ clinician.full_name }}</h3>
                            </div>
                        </div>

                        <!-- Clinician Details -->
                        <div class="space-y-2 grid grid-cols-2 gap-2">
                            <div class="space-y-1">
                                <div class="text-xs font-semibold text-base-content/60">Languages:</div>
                                <div class="flex flex-wrap gap-1">
                                    <span v-for="lang in clinician.languages" :key="lang"
                                        class="badge badge-outline badge-xs">
                                        {{ lang }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-col gap-1">
                                <span class="text-xs font-semibold text-base-content/60">Specialties:</span>
                                <ul class="list-disc pl-4">
                                    <li v-for="specialty in clinician.specialties" :key="specialty">
                                        {{ specialty }}
                                    </li>
                                </ul>
                            </div>

                            <div class="flex flex-col gap-1">
                                <span class="text-xs font-semibold text-base-content/60">Insurance:</span>
                                <span v-for="insurance in clinician.insurances" :key="insurance"
                                    class="badge badge-outline badge-xs">
                                    {{ insurance }}
                                </span>
                            </div>

                            <div class="flex flex-col gap-1">
                                <span class="text-xs font-semibold text-base-content/60">Availability:</span>
                                <ul class="list-disc pl-4">
                                    <span v-for="slot in clinician.available_slots" :key="slot"
                                        class="badge badge-outline badge-xs">
                                        {{ slot }}
                                    </span>
                                </ul>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary btn-sm">
                                Book Appointment
                            </button>
                            <button class="btn btn-outline btn-sm">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset Button -->
            <div class="text-center">
                <button @click="handleReset" class="btn btn-outline btn-lg gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start New Search
                </button>
            </div>
        </div>
    </div>
</template>