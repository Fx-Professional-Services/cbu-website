let token_accounting;

const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;
const api_username = process.env.NEXT_PUBLIC_USERNAME;
const api_password = process.env.NEXT_PUBLIC_PASSWORD;

const encodedCredentials = Buffer.from(
  `${api_username}:${api_password}`
).toString("base64");

const getTokenforHorizonAccounting = async () => {
  const response = await fetch(
    `${host}/fmi/data/${version}/databases/Horizon Accounting/sessions`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  console.log(data);
  token_accounting = data.response.token;
};

export default async function handler(req, res) {
  await getTokenforHorizonAccounting();
  // res.status(200).json({ message: token_accounting });
  return token_accounting;
}
