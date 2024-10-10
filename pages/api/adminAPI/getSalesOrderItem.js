const host = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
    const { token, orderId } = req.body;
    const response = await fetch(
      `${host}/fmi/data/v1/databases/horizon order/layouts/query: Sales Orders (CBU website)/_find`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: [
            {
              "Sales Order Item::_order id": "==" + orderId,
            },
          ],
        }),
      }
    );

    if (response.status == 401) {
      res.status(401).json({ message: response.statusText });
    } else {
      const data = await response.json();
	  if(data.response.data.length != 0) {
		res.status(401).json({message: "Error on finding sales order items"})
	  } else {
		  res.status(200).json({ message: data.response.data[0].portalData["Sales Order Item"]});
	  }
    }
}