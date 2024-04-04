const host = process.env.NEXT_PUBLIC_API_URL;
export default async function handler(req, res) {
  const { token } = req.body;
  const response = await fetch(
    `${host}/fmi/data/v1/databases/horizon order/layouts/Web FAQs/records`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status == 401) {
    res.status(401).json(
      {
        status: response.status,
        message: response.statusText
      }
    );
  } else {
    const data = await response.json();
    res.status(200).json({ message: data });
  }
}
