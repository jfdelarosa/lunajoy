import type { Router } from "@lunajoy/api/routes";
import { hc } from "hono/client";

const client = hc<Router>("");

type Client = typeof client;

export default function (): Client {
    return client;
};
