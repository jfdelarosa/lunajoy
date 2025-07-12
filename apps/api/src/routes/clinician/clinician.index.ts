import createRouter from "@/lib/create-router";
import * as handlers from "./clinician.handler";
import * as routes from "./clinician.routes";

const router = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.match, handlers.match)

export default router;