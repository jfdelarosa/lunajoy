<script setup lang="ts">
const emit = defineEmits<{
    (e: 'previous'): void
    (e: 'next'): void
}>()

type State = {
    name: string
    code: string
}

const states: State[] = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' },
    { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' },
    { name: 'Delaware', code: 'DE' },
    { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' },
    { name: 'Hawaii', code: 'HI' },
    { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' },
    { name: 'Indiana', code: 'IN' },
    { name: 'Iowa', code: 'IA' },
    { name: 'Kansas', code: 'KS' },
    { name: 'Kentucky', code: 'KY' },
    { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' },
    { name: 'Maryland', code: 'MD' },
    { name: 'Massachusetts', code: 'MA' },
    { name: 'Michigan', code: 'MI' },
    { name: 'Minnesota', code: 'MN' },
    { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' },
    { name: 'Montana', code: 'MT' },
    { name: 'Nebraska', code: 'NE' },
    { name: 'Nevada', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' },
    { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' },
    { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' },
    { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' },
    { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' },
    { name: 'Wyoming', code: 'WY' }
];

const languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
]
</script>

<template>
    <!-- Main Card -->
    <div class="card bg-white shadow-lg shadow-base-300 border border-base-300 w-full">
        <div class="card-body p-8">
            <h2 class="card-title">Profile</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What is your name?</legend>
                    <input type="text" class="input w-full" placeholder="Type here" />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Where do you live?</legend>
                    <select class="select w-full">
                        <option disabled selected>Pick a state</option>
                        <option v-for="state in states" :key="state.code" :value="state.code">
                            {{ state.name }}
                        </option>
                    </select>
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What language do you prefer to communicate in?</legend>
                    <select class="select w-full">
                        <option disabled selected>Pick a language</option>
                        <option v-for="language in languages" :key="language.code" :value="language.code">
                            {{ language.name }}
                        </option>
                    </select>
                </fieldset>
            </div>
        </div>
    </div>
</template>