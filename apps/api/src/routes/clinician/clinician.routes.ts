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


export type ListRoute = typeof list;