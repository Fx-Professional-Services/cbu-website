const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;

export default async function handler(req, res) {
    const { token, orderID, configurationOptionItemID, customerTierID, itemID, parentOrderItemID = "", partyID} = req.body;
    const response = await fetch(
      `${host}/fmi/data/${version}/databases/Horizon Order/layouts/query: sales order item v1/records`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "fieldData": {
          "_configuration option item id": configurationOptionItemID,
          "_customer tier id": customerTierID,
          "_item id": itemID,
          "_order id": orderID,
          "_parent order item id": parentOrderItemID,
          "_party id": partyID
          }
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