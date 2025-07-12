import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute, MatchRoute } from "./clinician.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { WeightedScoringEngine } from "@/lib/matching";
import { getSpecialty, getTimeSlot, getLanguage, getInsurance, getGender, getState } from "@lunajoy/shared";
import type { Clinician } from "@lunajoy/shared";

// Helper function to convert ID values to text values for response
function convertClinicianIdsToText(clinician: Clinician) {
	return {
		...clinician,
		state: getState(clinician.state),
		languages: clinician.languages.map((id: string) => getLanguage(id)),
		gender: getGender(clinician.gender),
		insurances: clinician.insurances.map((id: string) => getInsurance(id)),
		specialties: clinician.specialties.map((id: string) => getSpecialty(id)),
		available_slots: clinician.available_slots.map((id: string) => getTimeSlot(id)),
	};
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
	return c.json([], HttpStatusCodes.OK);
};

export const match: AppRouteHandler<MatchRoute> = async (c) => {
	try {
		const intake = await c.req.valid('json');

		// Use the weighted scoring engine
		const scoringEngine = new WeightedScoringEngine();
		const matches = await scoringEngine.matchPatientToClinicians(intake);

		// Convert the matched clinicians to text values for the response
		const rankedClinicians = matches.map(match => {
			const convertedMatch = convertClinicianIdsToText(match);

			return {
				...convertedMatch,
				matching_score: match.matching_score,
				explanation: match.explanation,
				overlapping_attributes: match.overlapping_attributes,
				gender: getGender(match.gender),
			};
		});

		return c.json(rankedClinicians, HttpStatusCodes.OK);
	} catch (error) {
		console.error('Matching error:', error);
		return c.json({ error: 'Internal server error' }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
	}
};
