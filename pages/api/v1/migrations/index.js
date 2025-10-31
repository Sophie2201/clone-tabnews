import migrateRunner from "node-pg-migrate";
import { dir } from "node:console";
import { join } from "node:path";
import database from "infra/database";

async function status(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrate",
  };
  if (request.method === "GET") {
    const pendingMigrations = await migrateRunner(defaultMigrationOptions);
    await dbClient.end();
    response.status(200).json(pendingMigrations);
  }
  if (request.method === "POST") {
    const migratedMigrations = await migrateRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      response.status(201).json(migratedMigrations);
    }
    response.status(200).json(migratedMigrations);
  }
}

export default status;
