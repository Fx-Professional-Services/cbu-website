const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;

export default async function handler(req, res) {
    const { token, orderID } = req.body;
    const response = await fetch(
      `${host}/fmi/data/${version}/databases/Horizon Order/layouts/query: sales order v1/_find`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: [
            {
              "SalesOrder::__id": "==" + orderID,
            },
          ],
        }),
      }
    );

    if (response.status == 401) {
      res.status(401).json({ message: response.statusText });
    } else {
      const data = await response.json();
      res.status(200).json({ message: data.response.data});
    }
}