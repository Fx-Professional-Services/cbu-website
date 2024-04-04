let token_party;

const host = process.env.NEXT_PUBLIC_API_URL;
const api_username = process.env.NEXT_PUBLIC_USERNAME;
const api_password = process.env.NEXT_PUBLIC_PASSWORD;
const encodedCredentials = Buffer.from(
  `${api_username}:${api_password}`
).toString("base64");

const getTokenforHorizonParty = async () => {
  const response = await fetch(
    `${host}/fmi/data/v1/databases/Horizon Party/sessions`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  token_party = data.response.token;
};

export default async function SessionParty(req, res) {
  await getTokenforHorizonParty();

  // res.status(200).json({ message: token_party });
  return token_party;
}
