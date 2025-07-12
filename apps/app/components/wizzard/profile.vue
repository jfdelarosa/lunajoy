<script setup lang="ts">
import { User, MapPin, Globe } from 'lucide-vue-next'
import { getStateOptions, getLanguageOptions } from '@lunajoy/shared'
import type { StateId, LanguageId } from '@lunajoy/shared'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { state, updateProfile } = useAppState()

const formData = ref({
    state: state.value?.state || '',
    language: state.value?.language || '',
})

// Watch for changes and update state
watch(formData, (newData) => {
    console.log(newData)
    updateProfile({
        state: newData.state as StateId,
        language: newData.language as LanguageId
    })
}, { deep: true })

const states = getStateOptions()
const languages = getLanguageOptions()

const isFormValid = computed(() => {
    return formData.value.state !== '' &&
        formData.value.language !== ''
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
                    <User class="w-6 h-6 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-2">
                    Tell us about yourself
                </h2>
                <p class="text-base-content/70">
                    This helps us find providers in your area who speak your language
                </p>
            </div>

            <!-- Form -->
            <div class="grid grid-cols-2 gap-6">
                <!-- State -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Where do you live?</legend>

                    <label class="select w-full">
                        <span class="label">
                            <MapPin class="size-4 text-base-content/40" />
                        </span>
                        <select v-model="formData.state" :class="{ 'select-error': formData.state === '' }">
                            <option disabled value="">Select your state</option>
                            <option v-for="state in states" :key="state.code" :value="state.code">
                                {{ state.name }}
                            </option>
                        </select>
                    </label>

                    <p class="text-xs text-base-content/60 mt-1">
                        We'll match you with licensed providers in your state
                    </p>
                </fieldset>

                <!-- Language -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What language do you prefer for sessions?</legend>
                    <label class="select w-full">
                        <span class="label">
                            <Globe class="size-4 text-base-content/40" />
                        </span>
                        <select v-model="formData.language" :class="{ 'select-error': formData.language === '' }">
                            <option disabled value="">Select your preferred language</option>
                            <option v-for="language in languages" :key="language.code" :value="language.code">
                                {{ language.name }}
                            </option>
                        </select>
                    </label>
                    <p class="text-xs text-base-content/60 mt-1">
                        We'll find providers who speak your preferred language
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