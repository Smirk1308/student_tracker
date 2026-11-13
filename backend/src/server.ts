/** Syllabus Wallah state API.
 * The Supabase service key remains only on this server.
 * Each browser owns a randomly generated device identifier. */
import cors from "cors";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const port = Number(process.env.PORT ?? 3001);
const origins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:5173").split(",");
const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const database = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } }) : null;
const app = express();
app.use(cors({ origin: origins, methods: ["GET", "PUT"] }));
app.use(express.json({ limit: "100kb" }));

const deviceId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isState = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const state = value as Record<string, unknown>;
  return state.schemaVersion === 1 && Array.isArray(state.subjects) && typeof state.settings === "object" && state.settings !== null;
};

app.get("/health", (_request, response) => response.json({ status: "ok", service: "syllabus-wallah-api", database: Boolean(database) }));
app.get("/api/state/:deviceId", async (request, response) => {
  if (!deviceId.test(request.params.deviceId)) return response.status(400).json({ error: "Invalid device ID." });
  if (!database) return response.status(200).json({ state: null });
  const { data, error } = await database.from("student_states").select("state").eq("device_id", request.params.deviceId).maybeSingle();
  if (error) return response.status(500).json({ error: "Unable to load state." });
  return response.json({ state: data?.state ?? null });
});
app.put("/api/state/:deviceId", async (request, response) => {
  if (!deviceId.test(request.params.deviceId) || !isState(request.body?.state)) return response.status(400).json({ error: "Invalid state payload." });
  if (!database) return response.status(503).json({ error: "Database not configured." });
  const { error } = await database.from("student_states").upsert({ device_id: request.params.deviceId, state: request.body.state, updated_at: new Date().toISOString() });
  if (error) return response.status(500).json({ error: "Unable to save state." });
  return response.status(204).end();
});
app.listen(port, () => console.log(`Syllabus Wallah API listening on ${port}`));
