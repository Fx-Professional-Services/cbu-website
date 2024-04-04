const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;

export default async function handler(req, res) {
    const { token, user } = req.body;
    const response = await fetch(
      `${host}/fmi/data/${version}/databases/horizon order/layouts/query: Sales Orders (CBU website)/_find`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: [
            {
              "sales order__PARTY::display name": "==" + user,
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