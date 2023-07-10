import { Options, Sequelize } from "sequelize";
import config from "@db/config";

let options: Options;

if (process.env.DB === "production") {
  options = config.production;
}
if (process.env.DB === "development") {
  options = config.development;
}
if (process.env.DB === "test") {
  options = config.test;
}

function createConnection(): Sequelize {
  return new Sequelize(options);
}

async function testConnection(conn: Sequelize) {
  try {
    await conn.authenticate();
  } catch (error) {
    throw new Error("Sequelize failed to authenticate connection to database.");
  }
}

const sequelize = createConnection();
await testConnection(sequelize);

export { options };

export default sequelize;
