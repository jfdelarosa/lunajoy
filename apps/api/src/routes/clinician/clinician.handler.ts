import { faker } from "@faker-js/faker";
import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./clinician.routes";

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