<script setup lang="ts">
import type { InferResponseType } from "hono/client";
import {
    Globe,
    Heart,
    Shield,
    Calendar,
    Star,
    Users,
    MapPin,
    Clock,
    CheckCircle
} from 'lucide-vue-next'

const apiClient = useApiClient()
const notImplementedModal = ref<HTMLDialogElement | null>(null)

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

function showModal() {
    console.log(notImplementedModal.value)

    notImplementedModal.value?.showModal()
}
</script>

<template>
    <div class="min-h-screen bg-base-200 py-8">

        <dialog ref="notImplementedModal" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Not implemented yet</h3>
                <p class="py-4">This feature is not implemented yet</p>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>


        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-base-content mb-2">Your Matched Clinicians</h1>
                <p class="text-base-content/70">
                    We found {{ results.length }} clinician{{ results.length !== 1 ? 's' : '' }}
                    that match your preferences
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div v-for="(clinician, index) in results" :key="clinician.id"
                    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/20">
                    <div class="card-body p-6">
                        <!-- Clinician Header -->
                        <div class="flex relative items-start gap-4 mb-6">
                            <div class="avatar">
                                <div
                                    class="w-16 h-16 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-3">
                                    <img :src="clinician.avatar" :alt="clinician.full_name" />
                                </div>
                            </div>
                            <div class="flex-1">
                                <h3 class="card-title text-lg mb-1">{{ clinician.full_name }}</h3>
                                <div class="flex items-center gap-1 text-sm text-base-content/60">
                                    <MapPin class="w-4 h-4" />
                                    <span>Licensed in your state</span>
                                </div>
                            </div>
                            <!-- Match Score -->
                            <div v-if="index === 0"
                                class="absolute top-0 right-0 flex items-center gap-1 bg-success px-3 py-1 rounded-full">
                                <Star class="w-4 h-4 text-success-content" />
                                <span class="text-sm font-semibold text-success-content">Best Match</span>
                            </div>
                        </div>

                        <!-- Clinician Details -->
                        <div class="space-y-4">
                            <!-- Languages -->
                            <div class="flex items-start gap-3">
                                <Globe class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div class="flex-1">
                                    <div class="text-sm font-semibold text-base-content/80 mb-1">Languages</div>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="lang in clinician.languages" :key="lang"
                                            class="badge badge-ghost badge-sm capitalize">
                                            {{ lang }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Specialties -->
                            <div class="flex items-start gap-3">
                                <Heart class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div class="flex-1">
                                    <div class="text-sm font-semibold text-base-content/80 mb-1">Specialties</div>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="specialty in clinician.specialties" :key="specialty"
                                            class="badge badge-ghost badge-sm capitalize">
                                            {{ specialty }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Insurance -->
                            <div class="flex items-start gap-3">
                                <Shield class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div class="flex-1">
                                    <div class="text-sm font-semibold text-base-content/80 mb-1">Insurance</div>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="insurance in clinician.insurances" :key="insurance"
                                            class="badge badge-ghost badge-sm capitalize">
                                            {{ insurance }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Availability -->
                            <div class="flex items-start gap-3">
                                <Calendar class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div class="flex-1">
                                    <div class="text-sm font-semibold text-base-content/80 mb-1">Available Times</div>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="slot in clinician.available_slots" :key="slot"
                                            class="badge badge-ghost badge-sm capitalize">
                                            {{ slot }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="card-actions justify-end mt-6 pt-4 border-t border-base-300">
                            <button @click="notImplementedModal?.showModal()"
                                class="btn btn-primary btn-sm flex-1 gap-2">
                                <Calendar class="w-4 h-4" />
                                Book Appointment
                            </button>
                            <button @click="notImplementedModal?.showModal()" class="btn btn-outline btn-sm gap-2">
                                <Users class="w-4 h-4" />
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset Button -->
            <div class="text-center">
                <button @click="handleReset" class="btn btn-outline btn-lg gap-2">
                    <Clock class="w-5 h-5" />
                    Start New Search
                </button>
            </div>
        </div>
    </div>
</template>