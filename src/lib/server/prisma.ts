import { DATABASE_URL } from "$env/static/private";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "$lib/server/generated/client";

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
