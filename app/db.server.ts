import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "../drizzle/schema";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
