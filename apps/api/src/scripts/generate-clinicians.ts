import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import * as path from "path";
import {
    getStateIds,
    getLanguageIds,
    getInsuranceIds,
    getSpecialtyIds,
    getTimeSlotIds,
    getGenderIds,
    getAppointmentTypeIds
} from "@lunajoy/shared";

import type { Clinician, GenderId, InsuranceId, LanguageId, StateId, SpecialtyId, TimeSlotId, AppointmentTypeId } from "@lunajoy/shared";

function createDummyClinician(): Clinician {
    const stateIds = getStateIds();
    const languageIds = getLanguageIds();
    const insuranceIds = getInsuranceIds();
    const specialtyIds = getSpecialtyIds();
    const timeSlotIds = getTimeSlotIds();
    const genderIds = getGenderIds();
    const appointmentTypeIds = getAppointmentTypeIds();

    const gender = faker.helpers.arrayElement(genderIds) as GenderId;
    const sex = gender === 'M' ? 'male' : 'female';

    return {
        avatar: faker.image.personPortrait({ sex }),
        id: faker.string.uuid(),
        full_name: faker.person.fullName({ sex }),
        state: faker.helpers.arrayElement(stateIds) as StateId,
        languages: faker.helpers.arrayElements(languageIds, { min: 1, max: 2 }) as LanguageId[],
        gender: gender,
        insurances: faker.helpers.arrayElements(insuranceIds, { min: 2, max: 6 }) as InsuranceId[],
        specialties: faker.helpers.arrayElements(specialtyIds, { min: 1, max: 5 }) as SpecialtyId[],
        available_slots: faker.helpers.arrayElements(timeSlotIds, { min: 1, max: 3 }) as TimeSlotId[],
        current_load: faker.number.int({ min: 1, max: 8 }),
        max_load: faker.number.int({ min: 8, max: 16 }),
        accepts_medication: faker.datatype.boolean(),
        accepts_therapy: faker.datatype.boolean(),
        is_available: faker.datatype.boolean(),
        appointment_types: faker.helpers.arrayElements(appointmentTypeIds, { min: 1, max: 2 }) as AppointmentTypeId[],
    };
}

async function generateClinicians() {
    console.log("Generating 1000 clinicians...");

    const clinicians = Array.from({ length: 1000 }, createDummyClinician);

    const outputPath = path.join(__dirname, "../data/clinicians.json");
    const outputDir = path.dirname(outputPath);

    // Create the data directory if it doesn't exist
    const fs = require("fs");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the clinicians to the JSON file
    writeFileSync(outputPath, JSON.stringify(clinicians, null, 2));

    console.log(`Successfully generated ${clinicians.length} clinicians and saved to ${outputPath}`);
}

// Run the script
generateClinicians().catch(console.error); 