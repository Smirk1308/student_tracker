/**
 * Syllabus Wallah - Backend State Synchronization Service.
 * 
 * Architecture & Security:
 * - Express.js REST API interfacing with Supabase PostgreSQL.
 * - Service Role key remains strictly server-side; client has zero direct database credentials.
 * - Anonymous Device ID: State is segmented by device UUID with regex validation.
 * - Schema Guard: Incoming payload is verified for schemaVersion, subjects array, and settings.
 * - Resilient: Operates gracefully with or without active database credentials (e.g. during local tests).
 */
import cors from "cors";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const port = Number(process.env.PORT ?? 3001);
const origins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:5173").split(",");
const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase admin client if environment variables are provided
const database =
  supabaseUrl && serviceKey
    ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
    : null;

const app = express();

// Configure CORS and JSON body limits
app.use(cors({ origin: origins, methods: ["GET", "PUT"] }));
app.use(express.json({ limit: "100kb" }));

// UUID format validator for incoming device IDs
const DEVICE_ID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Defensive validator for student state document */
const isState = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const state = value as Record<string, unknown>;
  return (
    state.schemaVersion === 1 &&
    Array.isArray(state.subjects) &&
    typeof state.settings === "object" &&
    state.settings !== null
  );
};

/**
 * Health check endpoint for deployment probes (Render, Docker, Kubernetes).
 */
app.get("/health", (_request, response) =>
  response.json({
    status: "ok",
    service: "syllabus-wallah-api",
    database: Boolean(database),
  })
);

/**
 * GET /api/state/:deviceId
 * Retrieves the persisted state document for a given device.
 */
app.get("/api/state/:deviceId", async (request, response) => {
  const { deviceId } = request.params;
  if (!DEVICE_ID_REGEX.test(deviceId)) {
    return response.status(400).json({ error: "Invalid device ID format." });
  }

  // Graceful fallback if database is not configured
  if (!database) {
    return response.status(200).json({ state: null });
  }

  const { data, error } = await database
    .from("student_states")
    .select("state")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (error) {
    return response.status(500).json({ error: "Unable to load state from database." });
  }

  return response.json({ state: data?.state ?? null });
});

/**
 * PUT /api/state/:deviceId
 * Saves or updates (upserts) the student state document for a device.
 */
app.put("/api/state/:deviceId", async (request, response) => {
  const { deviceId } = request.params;
  const state = request.body?.state;

  if (!DEVICE_ID_REGEX.test(deviceId) || !isState(state)) {
    return response.status(400).json({ error: "Invalid state payload or device ID." });
  }

  if (!database) {
    return response.status(503).json({ error: "Database service not configured." });
  }

  const { error } = await database.from("student_states").upsert({
    device_id: deviceId,
    state,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return response.status(500).json({ error: "Unable to save state to database." });
  }

  return response.status(204).end();
});

app.listen(port, () => console.log(`Syllabus Wallah API listening on port ${port}`));

