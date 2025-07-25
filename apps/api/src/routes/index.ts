import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { AppOpenAPI } from "@/lib/types";
import { BASE_PATH } from "@/lib/constants";
import createRouter from "@/lib/create-router";
import clinician from "@/routes/clinician/clinician.index";
import { swaggerUI } from '@hono/swagger-ui'

export function registerRoutes(app: AppOpenAPI) {
    return app
        .doc(
            "/docs",
            {
                info: {
                    title: "API",
                    version: "1.0.0",
                },
                openapi: "3.0.0",
            },
        )
        .use("/swagger", swaggerUI({ url: '/docs' }))
        .use("*", logger())
        .use("*", cors())
        .use("*", async (c, next) => {
            // Add 5 - 7 seconds of latency to simulate a real-world API
            const min = 5000
            const max = 7000
            const latency = Math.floor(Math.random() * (max - min + 1)) + min
            await new Promise(resolve => setTimeout(resolve, latency))

            return next()
        })
        .route("/", clinician)
}

export const router = registerRoutes(
    createRouter().basePath(BASE_PATH),
);

export type Router = typeof router;