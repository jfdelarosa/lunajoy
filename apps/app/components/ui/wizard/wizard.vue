<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

interface Step {
    id: string
    title: string
    description?: string
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
    }
}
</script>

<template>
    <div class="w-full max-w-4xl mx-auto">
        <!-- Step Content Slot -->
        <div class="mb-6">
            <slot :current-step="currentStep" :step="steps[currentStep]" />
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center mt-6">
            <button class="btn btn-ghost btn-outline" :class="{ 'btn-disabled': isFirstStep }" :disabled="isFirstStep"
                @click="handlePrevious">
                <ArrowLeft class="size-4" />
                Previous
            </button>

            <div class="flex space-x-2">
                <button v-for="(step, index) in steps" :key="`dot-${step.id}`" class="btn btn-xs btn-circle" :class="{
                    'btn-primary': index === currentStep,
                    'btn-outline': index !== currentStep,
                    'btn-disabled': index > currentStep
                }" @click="handleStepClick(index)">
                    {{ index + 1 }}
                </button>
            </div>

            <button class="btn btn-primary" :class="{ 'btn-disabled': isLastStep }" :disabled="isLastStep"
                @click="handleNext">
                {{ isLastStep ? 'Finish' : 'Next' }}
                <ArrowRight v-if="!isLastStep" class="size-4" />
            </button>
        </div>
    </div>
</template>