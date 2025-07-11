import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const BASE_PATH = "/api" as const;

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);