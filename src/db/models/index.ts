import { Sequelize } from "sequelize";
import sequelize from "@db/connection";

import { FixAndFlip } from "./fix-and-flip";
import User from "./user";

/**
 * Creates tables in database if they don't exist based on defined models.
 */
async function syncTables(conn: Sequelize) {
  try {
    await conn.sync({ force: true });
  } catch (err) {
    throw new Error("Error syncing database tables.", { cause: err });
  }
}

// Define Sequelize table associations
User.hasMany(FixAndFlip);
FixAndFlip.belongsTo(User);

await syncTables(sequelize);

export { FixAndFlip, User };
export { propertyTypes, isPropertyType } from "./fix-and-flip";
