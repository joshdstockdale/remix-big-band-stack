import "dotenv/config"; // make sure to install dotenv package
export default {
  dialect: "postgresql",
  out: "./migrations",
  schema: "./app/db",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
};
