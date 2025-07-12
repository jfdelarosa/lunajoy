<script setup lang="ts">
import MatchResults from '@/components/MatchResults.vue'
import type { GenderPreference } from '@lunajoy/shared'
import {
    APPOINTMENT_TYPES,
    getState,
    getLanguage,
    getInsurance,
    getSpecialty,
    getTimeSlot,
    getGender,
    getAppointmentType
} from '@lunajoy/shared'
import {
    User,
    MapPin,
    Globe,
    Heart,
    Shield,
    Clock,
    Zap,
    Users,
    Calendar
} from 'lucide-vue-next'

const apiClient = useApiClient()
const route = useRoute()
const router = useRouter()

// State for results and loading
const results = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Extract query parameters
const queryParams = computed(() => ({
    appointment_type: route.query.appointment_type as string,
    state: route.query.state as string,
    language: route.query.language as string,
    gender_preference: route.query.gender_preference as GenderPreference,
    clinical_needs: route.query.clinical_needs ?
        (Array.isArray(route.query.clinical_needs) ? route.query.clinical_needs : [route.query.clinical_needs]) :
        [],
    insurance: route.query.insurance as string,
    preferred_availability: route.query.preferred_availability ?
        (Array.isArray(route.query.preferred_availability) ? route.query.preferred_availability : [route.query.preferred_availability]) :
        []
}))

// Validate required parameters
const isValidParams = computed(() => {
    const params = queryParams.value
    return !!(params.appointment_type && params.state && params.language)
})

// Computed properties for display
const formattedPreferences = computed(() => {
    const params = queryParams.value
    return {
        appointmentType: params.appointment_type ? getAppointmentType(params.appointment_type as string) : '',
        state: params.state ? getState(params.state as string) : '',
        language: params.language ? getLanguage(params.language as string) : '',
        genderPreference: params.gender_preference ? getGender(params.gender_preference as string) : '',
        clinicalNeeds: params.clinical_needs.filter(need => need).map(need => getSpecialty(need as string)),
        insurance: params.insurance ? getInsurance(params.insurance as string) : '',
        preferredAvailability: params.preferred_availability.filter(slot => slot).map(slot => getTimeSlot(slot as string))
    }
})

// Make API request
const fetchMatches = async () => {
    if (!isValidParams.value) {
        error.value = 'Missing required parameters'
        return
    }

    loading.value = true
    error.value = null

    try {
        const params = queryParams.value
        const response = await apiClient.api.match.$post({
            json: {
                appointment_type: params.appointment_type,
                state: params.state,
                language: params.language,
                gender_preference: params.gender_preference,
                clinical_needs: params.clinical_needs as string[],
                insurance: params.insurance,
                preferred_availability: params.preferred_availability as string[],
            }
        })

        const clinicians = await response.json()

        // Check if the response is an error
        if ('error' in clinicians) {
            error.value = clinicians.error
            return
        }

        results.value = clinicians
    } catch (err) {
        error.value = 'Failed to fetch matches. Please try again.'
        console.error('API Error:', err)
    } finally {
        loading.value = false
    }
}

// Handle reset - redirect back to wizard
const handleReset = () => {
    router.push('/')
}

// Fetch matches on mount
onMounted(() => {
    fetchMatches()
})

// Watch for query parameter changes
watch(queryParams, () => {
    fetchMatches()
}, { deep: true })


const sections = computed(() => {
    return [
        {
            title: "Care Type",
            icon: Heart,
            value: formattedPreferences.value.appointmentType
        },
        {
            title: "State",
            icon: MapPin,
            value: formattedPreferences.value.state
        },
        {
            title: "Language",
            icon: Globe,
            value: formattedPreferences.value.language
        },
        {
            title: "Gender Preference",
            icon: User,
            value: formattedPreferences.value.genderPreference
        },
        {
            title: "Clinical Needs",
            icon: Zap,
            value: formattedPreferences.value.clinicalNeeds
        },
        {
            title: "Insurance",
            icon: Shield,
            value: formattedPreferences.value.insurance,
        },
        {
            title: "Preferred Times",
            icon: Calendar,
            value: formattedPreferences.value.preferredAvailability
        },
    ]
})
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <div class="flex">
            <!-- Side Panel -->
            <div class="w-80 bg-base-100 shadow-lg border-r border-base-300 min-h-screen">
                <div class="sticky top-0 p-6">
                    <div class="flex items-center gap-2 mb-6">
                        <Users class="h-5 w-5 text-primary" />
                        <h2 class="text-lg font-semibold">Your Preferences</h2>
                    </div>

                    <div class="space-y-4">
                        <div v-for="section in sections" :key="section.title" class="flex items-start gap-3">
                            <component :is="section.icon" class="size-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <div class="font-medium text-sm text-base-content/70">{{ section.title }}</div>

                                <div class="flex flex-wrap gap-2" v-if="Array.isArray(section.value)">
                                    <div v-for="item in section.value" :key="item"
                                        class="badge badge-ghost badge-sm capitalize">
                                        {{ item }}
                                    </div>
                                </div>

                                <div v-else class="font-semibold capitalize">
                                    {{ section.value }}
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Edit Preferences Button -->
                    <div class="mt-6 pt-6 border-t border-base-300">
                        <button @click="handleReset" class="btn btn-outline btn-sm w-full">
                            <Clock class="h-4 w-4 mr-2" />
                            Edit Preferences
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 py-8">
                <div class="container mx-auto px-4">
                    <!-- Loading state -->
                    <div v-if="loading" class="flex justify-center items-center min-h-96">
                        <div class="loading loading-spinner loading-lg"></div>
                        <span class="ml-4 text-lg">Finding your perfect match...</span>
                    </div>

                    <!-- Error state -->
                    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-96">
                        <div class="alert alert-error max-w-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{{ error }}</span>
                        </div>
                        <button @click="handleReset" class="btn btn-primary mt-4">
                            Return to Wizard
                        </button>
                    </div>

                    <!-- Invalid parameters -->
                    <div v-else-if="!isValidParams" class="flex flex-col items-center justify-center min-h-96">
                        <div class="alert alert-warning max-w-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span>Invalid or missing parameters</span>
                        </div>
                        <button @click="handleReset" class="btn btn-primary mt-4">
                            Start Over
                        </button>
                    </div>

                    <!-- Results -->
                    <MatchResults v-else-if="results" :results="results" @reset="handleReset" />
                </div>
            </div>
        </div>
    </div>
</template>
