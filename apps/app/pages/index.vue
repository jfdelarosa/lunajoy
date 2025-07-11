<script setup lang="ts">
import { Heart, Users, Calendar, CheckCircle } from 'lucide-vue-next'

definePageMeta({
    layout: "onboarding",
});


const steps = [
    {
        title: "Tell us about your preferences",
        description: "We'll ask you a few questions to connect you with the right mental health professional",
    },
    {
        title: "Share your availability",
        description: "We'll ask you a few questions to connect you with the right mental health professional",
    },
    {
        title: "Get matched with providers",
        description: "We'll ask you a few questions to connect you with the right mental health professional",
    },
]
</script>

<template>
    <div class="max-w-xl mx-auto p-6">
        <!-- Welcome Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-primary mb-3">
                Let's find your perfect match
            </h1>
            <p class="text-lg text-base-content/70">
                We'll ask you a few questions to connect you with the right professional
            </p>
        </div>

        <!-- Main Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body p-8">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Heart class="w-8 h-8 text-primary" />
                    </div>
                    <h2 class="text-xl font-semibold text-base-content mb-3">
                        Ready to get started?
                    </h2>
                    <p class="text-base-content/70">
                        This will take about 3-5 minutes
                    </p>
                </div>

                <!-- What to expect -->
                <div class="space-y-3 mb-8">
                    <div class="flex items-center gap-3" v-for="(step, index) in steps" :key="step.title">
                        <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-primary font-semibold text-sm">{{ index + 1 }}</span>
                        </div>
                        <span class="text-base-content">{{ step.title }}</span>
                    </div>
                </div>

                <!-- Call to Action -->
                <div class="text-center">
                    <button class="btn btn-primary btn-lg w-full mb-3">
                        Begin Matching
                    </button>
                    <p class="text-xs text-base-content/60">
                        All information is secure and confidential
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>