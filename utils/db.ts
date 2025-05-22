import { PrismaClient } from "../lib/generated/prisma";

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

declare global {
  // This is to tell TS that the global namespace has this property
  // Helps with singleton in dev environments
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
