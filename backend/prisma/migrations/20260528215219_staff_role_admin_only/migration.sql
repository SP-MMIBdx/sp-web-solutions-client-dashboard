-- Migrate legacy auth role "client" to internal staff role "admin"
UPDATE "User" SET "role" = 'admin' WHERE "role" = 'client';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'admin';
