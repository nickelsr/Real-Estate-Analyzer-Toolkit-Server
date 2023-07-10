import useGetParameter from "@aws/ssm/useGetParameter";

export const jwtSecretKey = await useGetParameter("JWT_SIGNING_KEY");
