import dotenv from "dotenv";
dotenv.config();

const requiredEnvKeys = ["PORT", "MONGODB_URI", "NODE_ENV"] as const;

export type EnvConfig = {
  PORT: number;
  MONGODB_URI: string;
  NODE_ENV: "development" | "production" | "test";
};

const getRequiredEnv = (key: (typeof requiredEnvKeys)[number]): string => {
  const value = process.env[key];

  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env: EnvConfig = {
  PORT: Number.parseInt(getRequiredEnv("PORT"), 10),
  MONGODB_URI: getRequiredEnv("MONGODB_URI"),
  NODE_ENV: (process.env.NODE_ENV ?? "development") as EnvConfig["NODE_ENV"],
};

if (!Number.isInteger(env.PORT) || env.PORT <= 0) {
  throw new Error("PORT must be a positive integer");
}

if (!/^(development|production|test)$/.test(env.NODE_ENV)) {
  throw new Error("NODE_ENV must be one of: development, production, test");
}