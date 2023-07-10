import useGetParameter, { ParameterName } from "@aws/ssm/useGetParameter";
import { Options, PoolOptions } from "sequelize";

interface ConnectionParams {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  pool: PoolOptions;
}

interface ParamNames {
  host: ParameterName;
  port: ParameterName;
  database: ParameterName;
  username: ParameterName;
  password: ParameterName;
}

async function getParams(names: ParamNames): Promise<ConnectionParams> {
  try {
    const [host, port, database, username, password] = await Promise.all([
      useGetParameter(names.host),
      useGetParameter(names.port),
      useGetParameter(names.database),
      useGetParameter(names.username),
      useGetParameter(names.password),
    ]);

    const conn_params: ConnectionParams = {
      host: host,
      port: +port,
      username: username,
      password: password,
      database: database,
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    };

    return conn_params;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return Promise.reject();
}

const [PROD, DEV, TEST] = await Promise.all([
  getParams({
    host: "DB_PROD_HOST",
    port: "DB_PROD_PORT",
    database: "DB_PROD_DATABASE",
    username: "DB_PROD_USERNAME",
    password: "DB_PROD_PASSWORD",
  }),
  getParams({
    host: "DB_DEV_HOST",
    port: "DB_DEV_PORT",
    database: "DB_DEV_DATABASE",
    username: "DB_DEV_USERNAME",
    password: "DB_DEV_PASSWORD",
  }),
  getParams({
    host: "DB_TEST_HOST",
    port: "DB_TEST_PORT",
    database: "DB_TEST_DATABASE",
    username: "DB_TEST_USERNAME",
    password: "DB_TEST_PASSWORD",
  }),
]);

const production: Options = {
  username: PROD.username,
  password: PROD.password,
  database: PROD.database,
  host: PROD.host,
  port: PROD.port,
  dialect: PROD.dialect,
  pool: PROD.pool,
};

const development: Options = {
  username: DEV.username,
  password: DEV.password,
  database: DEV.database,
  host: DEV.host,
  port: DEV.port,
  dialect: DEV.dialect,
  pool: DEV.pool,
};

const test: Options = {
  username: TEST.username,
  password: TEST.password,
  database: TEST.database,
  host: TEST.host,
  port: TEST.port,
  dialect: TEST.dialect,
  pool: TEST.pool,
};

export default {
  production,
  development,
  test,
};
