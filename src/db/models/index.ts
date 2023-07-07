import { Sequelize } from "sequelize";
import sequelize from "@db/connection";

import { FixAndFlip } from "./fix-and-flip";
import User from "./user";

/**
 * Creates tables in database if they don't exist based on defined models.
 */
async function syncTables(conn: Sequelize) {
  await conn.sync({ force: true });
}

// Define Sequelize table associations
User.hasMany(FixAndFlip, {
  sourceKey: "id",
  foreignKey: "UserId",
  as: "fixAndFlips",
});
FixAndFlip.belongsTo(User);

syncTables(sequelize);

export { FixAndFlip, User };
export { propertyTypes, isPropertyType } from "./fix-and-flip";
