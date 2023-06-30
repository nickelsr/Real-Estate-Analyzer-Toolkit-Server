// import User from "./user";
import { Sequelize } from "sequelize";
import sequelize from "@db/connection";
import FixAndFlip from "./fix-and-flip";

// User.hasMany(fixAndFlip);
// fixAndFlip.belongsTo(User);

// export { User, fixAndFlip };

/**
 * Creates tables in database if they don't exist based on defined models.
 */
async function syncTables(conn: Sequelize) {
  await conn.sync();
}

syncTables(sequelize);

export { FixAndFlip };
