import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import {
	ClinicianSchema,
	MatchedClinicianSchema,
	PatientIntakeSchema,
} from "@lunajoy/shared";

const tags = ["Clinician"];

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
