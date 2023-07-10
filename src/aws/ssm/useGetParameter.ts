import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

function isString(
  value: string | undefined,
  name: string
): asserts value is string {
  if (typeof value === "undefined") {
    throw new Error(`${name} parameter's value is undefined.`);
  }
}

export type ParameterName =
  | "JWT_SIGNING_KEY"
  | "DB_PROD_HOST"
  | "DB_PROD_PORT"
  | "DB_PROD_DATABASE"
  | "DB_PROD_USERNAME"
  | "DB_PROD_PASSWORD"
  | "DB_TEST_HOST"
  | "DB_TEST_PORT"
  | "DB_TEST_DATABASE"
  | "DB_TEST_USERNAME"
  | "DB_TEST_PASSWORD"
  | "DB_DEV_HOST"
  | "DB_DEV_PORT"
  | "DB_DEV_DATABASE"
  | "DB_DEV_USERNAME"
  | "DB_DEV_PASSWORD";

async function useGetParameter(name: ParameterName): Promise<string> {
  const client = new SSMClient({ region: "us-west-1" });
  const input = {
    Name: name,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);

  try {
    const { Parameter } = await client.send(command);
    isString(Parameter?.Value, name);

    return Parameter.Value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error fetching parameter from SSM Parameter-Store.");
  }
}

export default useGetParameter;
