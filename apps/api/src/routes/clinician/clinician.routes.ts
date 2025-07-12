import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Clinician"];

const ClinicianSchema = z.object({
	id: z.string().uuid(),
	full_name: z.string(),
	state_licenses: z.array(z.string()),
	languages_spoken: z.array(z.string()),
	gender: z.enum(["male", "female", "non-binary", "other"]),
	insurances_accepted: z.array(z.string()),
	specialties: z.array(z.string()),
	available_time_slots: z.array(z.string()),
	session_load: z.number().nonnegative(),
	accepts_medication: z.boolean(),
});

export const list = createRoute({
	method: "get",
	path: "/clinicians",
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(ClinicianSchema),
			"The list of clinicians",
		),
	},
	tags,
});

const PatientIntakeSchema = z.object({
	state: z.string().optional(),
	language: z.string().optional(),
	gender_preference: z.enum(["male", "female", "non-binary", "other", "no_preference"]).optional(),
	appointment_type: z.enum(["therapy", "psychiatry", "both"]),
	clinical_needs: z.array(z.string()).optional(),
	insurance: z.string().optional(),
	preferred_availability: z.array(z.string()),
	immediate_availability_required: z.boolean().default(false),
});

const MatchedClinicianSchema = ClinicianSchema.extend({
	matching_score: z.number(),
	explanation: z.string(),
	overlapping_attributes: z.array(z.string()),
});

export const match = createRoute({
	method: "post",
	path: "/match",
	request: {
		body: jsonContent(PatientIntakeSchema, "Patient intake data for matching"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(MatchedClinicianSchema),
			"Ranked list of matched clinicians",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			z.object({ error: z.string() }),
			"Internal server error",
		),
	},
	tags,
});

export type ListRoute = typeof list;
export type MatchRoute = typeof match;
