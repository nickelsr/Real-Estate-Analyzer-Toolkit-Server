import { Options, Sequelize } from "sequelize";
import config from "@db/config";

let options: Options;

if (process.env.NODE_ENV === "production") {
  options = config.production;
} else {
  options = config.development;
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
