<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const emit = defineEmits<{
    (e: 'next'): void
}>()

const steps = [
    {
        title: "Tell us about yourself",
        description: "Basic information to help us get started",
    },
    {
        title: "What kind of care do you need?",
        description: "Therapy or medication management",
    },
    {
        title: "Share your preferences",
        description: "Provider preferences and insurance information",
    },
    {
        title: "Choose your availability",
        description: "When would you like to meet?",
    },
    {
        title: "Get matched",
        description: "We'll find the best providers for you",
    },
]
</script>

<template>
    <!-- Main Card -->
    <div class="card bg-white shadow-xl border border-base-300">
        <div class="card-body p-8">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart class="w-8 h-8 text-primary" />
                </div>
                <h2 class="text-xl font-semibold text-base-content mb-3">
                    Let's find your perfect match
                </h2>
                <p class="text-base-content/70">
                    Answer a few quick questions to connect with the right professional.This will take about 2-3 minutes
                </p>
            </div>

            <!-- What to expect -->
            <div class="space-y-4 mb-8">
                <div class="flex items-start gap-3" v-for="(step, index) in steps" :key="step.title">
                    <div
                        class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span class="text-primary font-semibold text-sm">{{ index + 1 }}</span>
                    </div>
                    <div>
                        <p class="text-base-content font-medium">{{ step.title }}</p>
                        <p class="text-sm text-base-content/60">{{ step.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center">
                <button class="btn btn-primary btn-lg w-full mb-3" @click="emit('next')">
                    Begin Matching
                </button>
                <p class="text-xs text-base-content/60">
                    All information is secure and confidential
                </p>
            </div>
        </div>
    </div>
</template>