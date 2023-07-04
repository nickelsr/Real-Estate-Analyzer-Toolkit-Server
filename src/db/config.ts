import useGetParameter, {
  DB_DEV_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_PROD_DATABASE,
  DB_TEST_DATABASE,
  DB_USERNAME,
} from "@aws/ssm/useGetParameter";

interface ConnectionParams {
  host: string;
  port: number;
  username: string;
  password: string;
  prod_database: string;
  test_database: string;
  dev_database: string;
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
}

async function getParams(): Promise<ConnectionParams> {
  try {
    const [
      host,
      port,
      username,
      password,
      dev_database,
      prod_database,
      test_database,
    ] = await Promise.all([
      useGetParameter(DB_HOST),
      useGetParameter(DB_PORT),
      useGetParameter(DB_USERNAME),
      useGetParameter(DB_PASSWORD),
      useGetParameter(DB_DEV_DATABASE),
      useGetParameter(DB_PROD_DATABASE),
      useGetParameter(DB_TEST_DATABASE),
    ]);

    const conn_params: ConnectionParams = {
      host: host,
      port: +port,
      username: username,
      password: password,
      prod_database: prod_database,
      test_database: test_database,
      dev_database: dev_database,
      dialect: "postgres",
    };

    return conn_params;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return Promise.reject();
}

const conn_params = await getParams();

export default {
  development: {
    username: conn_params.username,
    password: conn_params.password,
    database: conn_params.dev_database,
    host: conn_params.host,
    port: conn_params.port,
    dialect: conn_params.dialect,
  },
  test: {
    username: conn_params.username,
    password: conn_params.password,
    database: conn_params.test_database,
    host: conn_params.host,
    port: conn_params.port,
    dialect: conn_params.dialect,
  },
  production: {
    username: conn_params.username,
    password: conn_params.password,
    database: conn_params.prod_database,
    host: conn_params.host,
    port: conn_params.port,
    dialect: conn_params.dialect,
  },
};
