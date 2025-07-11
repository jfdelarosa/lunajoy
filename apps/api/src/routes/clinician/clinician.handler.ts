import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./clinician.routes";

function createDummyClinician() {
	return {
		id: "1",
		full_name: "John Doe",
		state_licenses: ["CA", "NY"],
		languages_spoken: ["English", "Spanish"],
		gender: "male" as const,
		insurances_accepted: ["Aetna", "Blue Cross"],
		specialties: ["anxiety", "trauma"],
		available_time_slots: ["morning", "evening"],
		session_load: 3,
		accepts_medication: true,
	};
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
	const n = 10;
	const clinicians = Array.from({ length: n }, createDummyClinician);

	return c.json(clinicians);
};