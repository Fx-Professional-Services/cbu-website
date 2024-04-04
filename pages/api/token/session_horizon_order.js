let token_order;

const host = process.env.NEXT_PUBLIC_API_URL;
const api_username = process.env.NEXT_PUBLIC_USERNAME;
const api_password = process.env.NEXT_PUBLIC_PASSWORD;
const encodedCredentials = Buffer.from(
  `${api_username}:${api_password}`
).toString("base64");

const getTokenforHorizonOrder = async () => {
  const response = await fetch(
    `${host}/fmi/data/v1/databases/horizon order/sessions`,
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
  token_order = data.response.token;
};

export default async function handler(req, res) {
  await getTokenforHorizonOrder();
  // res.status(200).json({ message: token_order });
  return token_order;
}
