import { faker } from "@faker-js/faker";
import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute, MatchRoute } from "./clinician.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

function createDummyClinician() {
	const stateAbbreviations = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI", "NJ", "VA", "WA", "AZ", "MA", "TN", "IN", "MO", "MD", "WI", "CO", "MN", "SC", "AL", "LA", "KY", "OR", "OK", "CT", "UT", "AR", "NV", "MS", "KS", "NM", "NE", "WV", "ID", "HI", "NH", "ME", "RI", "MT", "DE", "SD", "ND", "AK", "VT", "WY"];
	const languages = ["English", "Spanish"];
	const insurances = ["Aetna", "Blue Cross Blue Shield", "Cigna", "UnitedHealthcare", "Humana", "Kaiser Permanente", "Anthem", "Molina Healthcare", "Centene", "WellCare", "Medicare", "Medicaid", "Tricare"];
	const specialties = ["anxiety", "depression", "trauma", "PTSD", "bipolar disorder", "eating disorders", "substance abuse", "relationship counseling", "family therapy", "grief counseling", "anger management", "stress management", "ADHD", "autism spectrum", "OCD", "phobias", "panic disorder", "borderline personality disorder"];
	const timeSlots = ["morning", "afternoon", "evening", "late evening", "weekends"];
	const genders = ["male", "female", "non-binary"] as const;

	return {
		id: faker.string.uuid(),
		full_name: faker.person.fullName(),
		state_licenses: faker.helpers.arrayElements(stateAbbreviations, { min: 1, max: 4 }),
		languages_spoken: faker.helpers.arrayElements(languages, { min: 1, max: 3 }),
		gender: faker.helpers.arrayElement(genders),
		insurances_accepted: faker.helpers.arrayElements(insurances, { min: 2, max: 6 }),
		specialties: faker.helpers.arrayElements(specialties, { min: 1, max: 5 }),
		available_time_slots: faker.helpers.arrayElements(timeSlots, { min: 1, max: 3 }),
		session_load: faker.number.int({ min: 1, max: 8 }),
		accepts_medication: faker.datatype.boolean(),
	};
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
	const n = 10;
	const clinicians = Array.from({ length: n }, createDummyClinician);

	return c.json(clinicians);
};

export const match: AppRouteHandler<MatchRoute> = async (c) => {
	try {
		const intake = await c.req.valid('json');
		const n = 50;
		const clinicians = Array.from({ length: n }, createDummyClinician);

		// Step 1: Initial Filtering (Hard Constraints)
		const filteredClinicians = clinicians.filter(clinician => {
			// State license requirement
			if (intake.state && !clinician.state_licenses.includes(intake.state)) return false;

			// Language requirement
			if (intake.language && !clinician.languages_spoken.includes(intake.language)) return false;

			// Gender preference requirement
			if (intake.gender_preference && intake.gender_preference !== 'no_preference' && clinician.gender !== intake.gender_preference) return false;

			// Clinical needs - ALL must match for hard constraint
			if (intake.clinical_needs && intake.clinical_needs.length > 0) {
				for (const need of intake.clinical_needs) {
					if (!clinician.specialties.includes(need)) return false;
				}
			}

			// Insurance acceptance requirement
			if (intake.insurance && !clinician.insurances_accepted.includes(intake.insurance)) return false;

			// Preferred availability requirement
			if (intake.preferred_availability && intake.preferred_availability.length > 0) {
				let matchesAvailability = false;
				for (const slot of intake.preferred_availability) {
					if (clinician.available_time_slots.includes(slot)) {
						matchesAvailability = true;
						break;
					}
				}
				if (!matchesAvailability) return false;
			}

			return true;
		});

		// Step 2: Scoring & Prioritization (Weighted)
		const scoredClinicians = filteredClinicians.map(clinician => {
			let score = 0;
			const overlappingAttributes = [];

			// Immediate Availability: High point value with bonus for real-time availability
			if (intake.immediate_availability_required) {
				if (clinician.available_time_slots.includes('morning')) {
					score += 25; // High bonus for immediate availability
					overlappingAttributes.push('immediate_morning_availability');
				}
				if (clinician.available_time_slots.includes('afternoon')) {
					score += 20;
					overlappingAttributes.push('immediate_afternoon_availability');
				}
			} else {
				// Standard availability scoring
				if (intake.preferred_availability) {
					for (const slot of intake.preferred_availability) {
						if (clinician.available_time_slots.includes(slot)) {
							score += 8;
							overlappingAttributes.push(`${slot}_availability`);
						}
					}
				}
			}

			// Insurance Constraint: Significant point value
			if (intake.insurance && clinician.insurances_accepted.includes(intake.insurance)) {
				score += 18;
				overlappingAttributes.push('insurance_accepted');
			}

			// Load Balancing: Moderate reward for lower current match_count
			const avgLoad = clinicians.reduce((sum, c) => sum + c.session_load, 0) / clinicians.length;
			const loadBalanceScore = Math.max(0, 8 * (1 - (clinician.session_load / (avgLoad * 1.5))));
			score += loadBalanceScore;
			if (loadBalanceScore > 4) {
				overlappingAttributes.push('low_session_load');
			}

			// Overlapping Attributes: Minor points for each matching attribute
			// State license matches
			if (intake.state && clinician.state_licenses.includes(intake.state)) {
				score += 3;
				overlappingAttributes.push('state_licensed');
			}

			// Language matches
			if (intake.language && clinician.languages_spoken.includes(intake.language)) {
				score += 3;
				overlappingAttributes.push('language_match');
			}

			// Gender preference matches
			if (intake.gender_preference && intake.gender_preference !== 'no_preference' && clinician.gender === intake.gender_preference) {
				score += 3;
				overlappingAttributes.push('gender_preference_match');
			}

			// Clinical needs matches
			if (intake.clinical_needs) {
				for (const need of intake.clinical_needs) {
					if (clinician.specialties.includes(need)) {
						score += 4;
						overlappingAttributes.push(`${need}_specialty`);
					}
				}
			}

			// Appointment type consideration
			if (intake.appointment_type === 'psychiatry' && clinician.accepts_medication) {
				score += 5;
				overlappingAttributes.push('medication_management');
			}

			// Round score to 2 decimal places
			score = Math.round(score * 100) / 100;

			// Create explanation
			let explanation = 'Matched';
			if (overlappingAttributes.length > 0) {
				explanation += ` based on: ${overlappingAttributes.join(', ')}`;
			}
			if (loadBalanceScore > 4) {
				explanation += `. Has lower session load for better availability.`;
			}

			return {
				...clinician,
				matching_score: score,
				explanation,
				overlapping_attributes: overlappingAttributes
			};
		});

		// Step 3: Ranking & Output Formatting
		const rankedClinicians = scoredClinicians
			.sort((a, b) => b.matching_score - a.matching_score)
			.slice(0, 8); // Return top 8 matches

		return c.json(rankedClinicians, HttpStatusCodes.OK);
	} catch (error) {
		return c.json({ error: 'Internal server error' }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
	}
};
