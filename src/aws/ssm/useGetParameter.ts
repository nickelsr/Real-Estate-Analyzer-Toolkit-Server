import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

export type ParameterName = "JWT_SIGNING_KEY" | "DB_PROD_HOST" | "DB_PROD_PORT" | "DB_PROD_DATABASE" | "DB_PROD_USERNAME" | "DB_PROD_PASSWORD";

async function useGetParameter(name: ParameterName): Promise<string> {
  const client = new SSMClient({ region: "us-west-1" });

  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });

  let fetchedValue;

  try {
    const { Parameter } = await client.send(command);

    fetchedValue = Parameter?.Value;
  } catch (err) {
    throw new Error("Error accessing SSM Parameter-Store.", { cause: err });
  }

  if (!fetchedValue) {
    throw new Error("Fetched parameter does not contain expected value.");
  }

  return fetchedValue;
}

export default useGetParameter;
