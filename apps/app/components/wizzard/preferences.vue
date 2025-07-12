<script setup lang="ts">
const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

const genderPreferences = [
    { name: 'No Preference', value: 'no_preference' },
    { name: 'Female', value: 'female' },
    { name: 'Male', value: 'male' },
    { name: 'Non-binary', value: 'non_binary' },
]

const appointmentTypes = [
    { name: 'Therapy', value: 'therapy' },
    { name: 'Medication Management', value: 'medication' },
    { name: 'Both', value: 'both' },
]

const urgencyLevels = [
    { name: 'Within 24 hours', value: 'urgent' },
    { name: 'Within a week', value: 'high' },
    { name: 'Within a month', value: 'medium' },
    { name: 'No rush', value: 'low' },
]

const clinicalNeeds = [
    { name: 'Anxiety', value: 'anxiety' },
    { name: 'Depression', value: 'depression' },
    { name: 'Trauma/PTSD', value: 'trauma' },
    { name: 'Relationship Issues', value: 'relationship' },
    { name: 'Work/Career Stress', value: 'work_stress' },
    { name: 'Family Issues', value: 'family' },
    { name: 'Self-esteem', value: 'self_esteem' },
    { name: 'Life Transitions', value: 'life_transitions' },
]

const timeSlots = [
    { name: 'Morning (8 AM - 12 PM)', value: 'morning' },
    { name: 'Afternoon (12 PM - 5 PM)', value: 'afternoon' },
    { name: 'Evening (5 PM - 8 PM)', value: 'evening' },
    { name: 'Weekend', value: 'weekend' },
]

const insuranceProviders = [
    { name: 'Aetna', value: 'aetna' },
    { name: 'Blue Cross Blue Shield', value: 'bcbs' },
    { name: 'Cigna', value: 'cigna' },
    { name: 'UnitedHealth', value: 'united' },
    { name: 'Kaiser Permanente', value: 'kaiser' },
    { name: 'Humana', value: 'humana' },
    { name: 'Self-pay', value: 'self_pay' },
    { name: 'Other', value: 'other' },
]
</script>

<template>
    <!-- Main Card -->
    <div class="card bg-white shadow-lg shadow-base-300 border border-base-300 w-full">
        <div class="card-body p-8">
            <h2 class="card-title mb-6">Preferences</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Gender Preference -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Gender Preference for Provider</legend>
                    <select class="select w-full">
                        <option disabled selected>Select preference</option>
                        <option v-for="gender in genderPreferences" :key="gender.value" :value="gender.value">
                            {{ gender.name }}
                        </option>
                    </select>
                </fieldset>

                <!-- Appointment Type -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Appointment Type</legend>
                    <select class="select w-full">
                        <option disabled selected>Select type</option>
                        <option v-for="type in appointmentTypes" :key="type.value" :value="type.value">
                            {{ type.name }}
                        </option>
                    </select>
                </fieldset>

                <!-- Urgency Level -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">How soon do you need care?</legend>
                    <select class="select w-full">
                        <option disabled selected>Select urgency</option>
                        <option v-for="urgency in urgencyLevels" :key="urgency.value" :value="urgency.value">
                            {{ urgency.name }}
                        </option>
                    </select>
                </fieldset>

                <!-- Insurance Provider -->
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Insurance Provider</legend>
                    <select class="select w-full">
                        <option disabled selected>Select insurance</option>
                        <option v-for="insurance in insuranceProviders" :key="insurance.value" :value="insurance.value">
                            {{ insurance.name }}
                        </option>
                    </select>
                </fieldset>
            </div>

            <!-- Clinical Needs (Full Width) -->
            <fieldset class="fieldset mt-6">
                <legend class="fieldset-legend">Clinical Needs (Select all that apply)</legend>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <label v-for="need in clinicalNeeds" :key="need.value" class="label cursor-pointer">
                        <input type="checkbox" :value="need.value" class="checkbox checkbox-primary" />
                        <span class="label-text ml-2">{{ need.name }}</span>
                    </label>
                </div>
            </fieldset>

            <!-- Preferred Time Slots -->
            <fieldset class="fieldset mt-6">
                <legend class="fieldset-legend">Preferred Time Slots (Select all that apply)</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <!-- <label v-for="slot in timeSlots" :key="slot.value" class="label cursor-pointer">
                        <input type="checkbox" :value="slot.value" class="checkbox checkbox-primary" />
                        <span class="label-text ml-2">{{ slot.name }}</span>
                    </label> -->
                </div>
            </fieldset>
        </div>
    </div>
</template>