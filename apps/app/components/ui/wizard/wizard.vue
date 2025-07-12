<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

interface Step {
    id: string
    title: string
    description?: string
    component: Component
}

interface Props {
    steps: Step[]
    currentStep: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
    (e: 'step-change', stepIndex: number): void
    (e: 'finish'): void
}>()

const isFirstStep = computed(() => props.currentStep === 0)
const isLastStep = computed(() => props.currentStep === props.steps.length - 1)

const handlePrevious = () => {
    if (!isFirstStep.value) {
        emit('previous')
    }
}

const handleNext = () => {
    if (!isLastStep.value) {
        emit('next')
    }
}

const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= props.currentStep) {
        emit('step-change', stepIndex)

        return
    }

    emit('finish')
}
</script>

<template>
    <div class="w-full max-w-4xl mx-auto">
        <!-- Step Content Slot -->
        <div class="mb-6">
            <slot :current-step="currentStep" :step="steps[currentStep]" />
        </div>
    </div>
</template>