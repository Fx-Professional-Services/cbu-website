import { host } from "./credentials";
import { base64Credetials } from "./credentials";

export default async function handler(req, res) {
    const { creator, orderId, price, quantity, customerTierId, itemId, partyId, parentOrderItemId, configurationOptionItemId } = req.body;

    console.log(req.body)

    try {
      let response = await fetch(`${host}/horizon%20order/Sales%20Order%20Item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credetials}`
        },
        body: JSON.stringify({
          "creator": creator,
          "_order id": orderId,
          "price": price,
          "quantity": quantity,
          "_customer tier id": customerTierId,
          "_item id": itemId,
          "_party id": partyId,
          "_parent order item id": parentOrderItemId,
          "_configuration option item id": configurationOptionItemId
        })
      });
    
     if (response.status == 401) {
      res.status(401).json({ message: response.statusText });
    } else {
     
      const data = await response.json();
     
      res.status(200).json({ data: data});
    }
    } catch (error) {
      console.error('Error:', error);
    }
}