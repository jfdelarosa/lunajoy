import createApp from "@/lib/create-app";
import { registerRoutes } from "@/routes";

const app = registerRoutes(createApp());

export default {
	fetch: app.fetch,
	port: process.env.PORT || 3000,
};