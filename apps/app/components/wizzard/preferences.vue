<script setup lang="ts">
import { UserCheck, CreditCard, Minus, MoreHorizontal, Mars, Venus, NonBinary } from 'lucide-vue-next'
import type { PatientIntakeState } from '~/types'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { state, updatePreferences } = useAppState()

const formData = ref({
    gender_preference: state.value?.gender_preference || '',
    insurance: state.value?.insurance || '',
})

// Watch for changes and update state
watch(formData, (newData) => {
    updatePreferences({
        gender_preference: newData.gender_preference as PatientIntakeState['gender_preference'],
        insurance: newData.insurance
    })
}, { deep: true })

const genderPreferences = [
    { name: 'No Preference', value: 'no_preference', icon: Minus },
    { name: 'Female', value: 'female', icon: Venus },
    { name: 'Male', value: 'male', icon: Mars },
    { name: 'Non-binary', value: 'non-binary', icon: NonBinary },
    { name: 'Other', value: 'other', icon: MoreHorizontal },
]

const insuranceProviders = [
    { name: 'Aetna', value: 'Aetna' },
    { name: 'Anthem', value: 'Anthem' },
    { name: 'Blue Cross Blue Shield', value: 'Blue Cross Blue Shield' },
    { name: 'Cigna', value: 'Cigna' },
    { name: 'Humana', value: 'Humana' },
    { name: 'Kaiser Permanente', value: 'Kaiser Permanente' },
    { name: 'Medicaid', value: 'Medicaid' },
    { name: 'Medicare', value: 'Medicare' },
    { name: 'Molina Healthcare', value: 'Molina Healthcare' },
    { name: 'Tricare', value: 'Tricare' },
    { name: 'UnitedHealthcare', value: 'UnitedHealthcare' },
    { name: 'Self-pay', value: 'Self-pay' },
    { name: 'Other', value: 'Other' },
]

const isFormValid = computed(() => {
    return formData.value.gender_preference !== '' && formData.value.insurance !== ''
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
                    <UserCheck class="w-6 h-6 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-2">
                    Provider preferences
                </h2>
                <p class="text-base-content/70">
                    Tell us about your provider preferences and insurance information
                </p>
            </div>

            <!-- Form -->
            <div class="space-y-6">
                <!-- Gender Preference -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Do you have a gender preference for your provider?</legend>
                    <div class="grid grid-cols-3 gap-3">
                        <label v-for="gender in genderPreferences" :key="gender.value"
                            class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-base-50 transition-colors"
                            :class="{ 'border-primary bg-primary/5': formData.gender_preference === gender.value }">
                            <input type="radio" :value="gender.value" v-model="formData.gender_preference"
                                class="radio radio-primary mr-3" />
                            <component :is="gender.icon" class="w-4 h-4 text-base-content/60 mr-2" />
                            <span class="text-base-content">{{ gender.name }}</span>
                        </label>
                    </div>
                    <p class="text-xs text-base-content/60 mt-2">
                        Many people feel more comfortable with a specific gender. This is completely normal and helps us
                        find the right fit.
                    </p>
                </fieldset>

                <!-- Insurance Provider -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What's your insurance provider?</legend>
                    <div class="select w-full ">
                        <span class="label">
                            <CreditCard class="size-4 text-base-content/40" />
                        </span>
                        <select v-model="formData.insurance" :class="{ 'select-error': formData.insurance === '' }">
                            <option disabled value="">Select your insurance provider</option>
                            <option v-for="insurance in insuranceProviders" :key="insurance.value"
                                :value="insurance.value">
                                {{ insurance.name }}
                            </option>
                        </select>
                    </div>
                    <p class="text-xs text-base-content/60 mt-2">
                        We'll match you with providers who accept your insurance to minimize out-of-pocket costs.
                    </p>
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