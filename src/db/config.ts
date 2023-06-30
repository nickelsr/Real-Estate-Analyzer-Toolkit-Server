import useGetParameter from "@aws/ssm/useGetParameter";

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

function isString(
  value: string | undefined,
  name: string
): asserts value is string {
  if (typeof value === "undefined") {
    throw new Error(`${name} parameter's value is undefined.`);
  }
}

async function getParams(): Promise<ConnectionParams> {
  const host_name = "DB_ENDPOINT";
  const host = await useGetParameter(host_name);
  isString(host?.Value, host_name);

  const port_name = "DB_PORT";
  const port = await useGetParameter(port_name);
  isString(port?.Value, port_name);

  const username_name = "DB_USERNAME";
  const username = await useGetParameter(username_name);
  isString(username?.Value, username_name);

  const password_name = "DB_PASSWORD";
  const password = await useGetParameter(password_name);
  isString(password?.Value, password_name);

  const prod_database_name = "DB_PROD_DATABASE";
  const prod_database = await useGetParameter(prod_database_name);
  isString(prod_database?.Value, prod_database_name);

  const test_database_name = "DB_TEST_DATABASE";
  const test_database = await useGetParameter(test_database_name);
  isString(test_database?.Value, test_database_name);

  const dev_database_name = "DB_DEV_DATABASE";
  const dev_database = await useGetParameter(dev_database_name);
  isString(dev_database?.Value, dev_database_name);

  const conn_params: ConnectionParams = {
    host: host.Value,
    port: +port.Value,
    username: username.Value,
    password: password.Value,
    prod_database: prod_database.Value,
    test_database: test_database.Value,
    dev_database: dev_database.Value,
    dialect: "postgres",
  };

  return conn_params;
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
