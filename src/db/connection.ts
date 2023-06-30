import { Options, Sequelize } from "sequelize";
import config from "@db/config";

export const options: Options = {
  host: config.production.host,
  port: config.production.port,
  username: config.production.username,
  password: config.production.password,
  database: config.production.database,
  dialect: config.production.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

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

export default sequelize;
