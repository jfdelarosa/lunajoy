<script setup lang="ts">
import { Heart, Shield, Users, Briefcase, Home, Smile, ArrowRight } from 'lucide-vue-next'
import { getSpecialtyOptions } from '@lunajoy/shared'

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const { state, updateClinicalNeeds } = useAppState()

const formData = ref({
    clinical_needs: [...(state.value?.clinical_needs || [])],
})

// Watch for changes and update state
watch(formData, (newData) => {
    updateClinicalNeeds({
        clinical_needs: newData.clinical_needs
    })
}, { deep: true })

const specialtyOptions = getSpecialtyOptions()

const clinicalNeeds = [
    {
        name: 'Anxiety',
        value: 'ANX',
        icon: Heart,
        description: 'Worry, panic attacks, social anxiety, or generalized anxiety'
    },
    {
        name: 'Depression',
        value: 'DEP',
        icon: Heart,
        description: 'Feeling sad, hopeless, or losing interest in activities'
    },
    {
        name: 'Trauma/PTSD',
        value: 'TRA',
        icon: Shield,
        description: 'Processing difficult experiences or traumatic events'
    },
    {
        name: 'Relationship Issues',
        value: 'REL',
        icon: Users,
        description: 'Dating, marriage, family, or friendship difficulties'
    },
    {
        name: 'Work/Career Stress',
        value: 'STR',
        icon: Briefcase,
        description: 'Job burnout, career changes, or workplace challenges'
    },
    {
        name: 'Family Issues',
        value: 'FAM',
        icon: Home,
        description: 'Family conflicts, parenting, or household stress'
    },
    {
        name: 'ADHD',
        value: 'ADHD',
        icon: Smile,
        description: 'Attention deficit and hyperactivity challenges'
    },
    {
        name: 'Eating Disorders',
        value: 'EAT',
        icon: ArrowRight,
        description: 'Eating patterns, body image, or food relationship issues'
    },
]

const isFormValid = computed(() => {
    return formData.value.clinical_needs.length > 0
})

const toggleNeed = (value: string) => {
    const index = formData.value.clinical_needs.indexOf(value)
    if (index > -1) {
        formData.value.clinical_needs.splice(index, 1)
    } else {
        formData.value.clinical_needs.push(value)
    }
}

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
                    <Heart class="w-6 h-6 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-2">
                    What would you like help with?
                </h2>
                <p class="text-base-content/70">
                    Select all that apply. We'll find therapists who specialize in these areas.
                </p>
            </div>

            <!-- Clinical Needs -->
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Areas you'd like to work on</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label v-for="need in clinicalNeeds" :key="need.value"
                        class="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-base-50 transition-colors"
                        :class="{ 'border-primary bg-primary/5': formData.clinical_needs.includes(need.value) }">
                        <input type="checkbox" :value="need.value"
                            :checked="formData.clinical_needs.includes(need.value)" @change="toggleNeed(need.value)"
                            class="checkbox checkbox-primary mr-4 mt-1" />
                        <component :is="need.icon" class="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <div class="font-medium text-base-content">{{ need.name }}</div>
                            <div class="text-sm text-base-content/70">{{ need.description }}</div>
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
                    Continue
                </button>
            </div>
        </div>
    </div>
</template>