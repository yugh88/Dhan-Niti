import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./config/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai_story-builder_owner:LoCZa35ikwrt@ep-square-frost-a14k6hgm.ap-southeast-1.aws.neon.tech/ai_story-builder?sslmode=require",
  },
  verbose: true,
  strict: true,
});
