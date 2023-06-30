import { SSMClient, GetParameterCommand, Parameter } from "@aws-sdk/client-ssm";

async function useGetParameter(name: string): Promise<Parameter | undefined> {
  const client = new SSMClient({ region: "us-west-1" });
  const input = {
    Name: name,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);

  try {
    const { Parameter } = await client.send(command);

    return Parameter;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error fetching parameter from SSM Parameter-Store.");
  }
}

export default useGetParameter;
