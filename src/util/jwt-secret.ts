// TODO: update key name in SSM and reflect change here

import useGetParameter from "@aws/ssm/useGetParameter";

const fetchPrivateKey = async (): Promise<string> => {
  let privateKey = "dev";

  if (process.env.NODE_ENV === "production") {
    try {
      privateKey = await useGetParameter("JWT_SIGNING_KEY");
    } catch (err) {
      throw new Error("Error fetching private key", { cause: err });
    }
  }

  return privateKey;
};

export const privateKey = await fetchPrivateKey();
