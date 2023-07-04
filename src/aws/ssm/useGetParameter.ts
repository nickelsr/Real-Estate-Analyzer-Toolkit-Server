import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

function isString(
  value: string | undefined,
  name: string
): asserts value is string {
  if (typeof value === "undefined") {
    throw new Error(`${name} parameter's value is undefined.`);
  }
}

type ParameterName =
  | "JWT_SIGNING_KEY"
  | "DB_ENDPOINT"
  | "DB_PORT"
  | "DB_USERNAME"
  | "DB_PASSWORD"
  | "DB_PROD_DATABASE"
  | "DB_TEST_DATABASE"
  | "DB_DEV_DATABASE";

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

export const JWT_SIGNING_KEY: ParameterName = "JWT_SIGNING_KEY";
export const DB_HOST: ParameterName = "DB_ENDPOINT";
export const DB_PORT: ParameterName = "DB_PORT";
export const DB_USERNAME: ParameterName = "DB_USERNAME";
export const DB_PASSWORD: ParameterName = "DB_PASSWORD";
export const DB_PROD_DATABASE: ParameterName = "DB_PROD_DATABASE";
export const DB_TEST_DATABASE: ParameterName = "DB_TEST_DATABASE";
export const DB_DEV_DATABASE: ParameterName = "DB_DEV_DATABASE";

export default useGetParameter;
