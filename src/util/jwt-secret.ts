import useGetParameter from "@aws/ssm/useGetParameter";

let jwtSecretKey: string;

if (process.env.DB === "production") {
  jwtSecretKey = await useGetParameter("JWT_SIGNING_KEY");
} else {
  jwtSecretKey = "dev";
}

export { jwtSecretKey };
