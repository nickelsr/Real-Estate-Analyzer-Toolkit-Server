import { Sequelize } from "sequelize";
import sequelize from "@db/connection";

import FixAndFlip from "./fix-and-flip";
import User from "./user";

/**
 * Creates tables in database if they don't exist based on defined models.
 */
async function syncTables(conn: Sequelize) {
  await conn.sync();
}

// Define Sequelize table associations
User.hasMany(FixAndFlip);
FixAndFlip.belongsTo(User);

syncTables(sequelize);

export { FixAndFlip, User };
