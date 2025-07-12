<script setup lang="ts">
import MatchResults from '@/components/MatchResults.vue'
import type { GenderPreference } from '@lunajoy/shared'
import { APPOINTMENT_TYPES } from '@lunajoy/shared'

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
</script>

<template>
    <div class="min-h-screen bg-base-200 py-8">
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
</template>
