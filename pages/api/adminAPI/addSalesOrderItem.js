const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;

export default async function handler(req, res) {
    const { token, orderID, configurationOptionItemID, customerTierID, itemID, parentOrderItemID = "", partyID, price, quantity, subtotal, withTax, tax, taxableAmount, isConfirmed, isInvoiced, isReturned, isShipped, discountAmount } = req.body;
    const response = await fetch(
      `${host}/fmi/data/${version}/databases/Horizon Order/layouts/query: sales order item v1/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "fieldData": {
          "_configuration option item id": configurationOptionItemID,
          "_customer tier id": customerTierID,
          "_item id": itemID,
          "_order id": "C1E4B977-62A8-B54D-B32B-B9F1EDAC1045",
          "_parent order item id": parentOrderItemID,
          "_party id": partyID,
          "price": price,
          "quantity": quantity,
          "subtotal": subtotal,
          "subtotal with tax": withTax,
          "tax": tax,
          "taxable amount": taxableAmount,
          "is confirmed": isConfirmed,
          "is invoiced": isInvoiced,
          "is returned": isReturned,
          "is shipped": isShipped,
          "discount amount": discountAmount
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