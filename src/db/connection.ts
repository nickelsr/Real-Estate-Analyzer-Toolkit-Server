import { Sequelize } from "sequelize";

function verifyDatabaseURI(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Database URI failed to load!");
  }
}

async function verifyConnection(conn: Sequelize) {
  try {
    await sequelize.authenticate();
  } catch (e) {
    throw new Error("Sequelize failed to connect to database");
  }
}

const DB_URI = process.env.DB_URI;
verifyDatabaseURI(DB_URI);

const sequelize = new Sequelize(DB_URI);

verifyConnection(sequelize);

export default sequelize;
