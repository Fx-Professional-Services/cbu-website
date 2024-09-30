import { base64Credetials, host } from "./credentials";

export default async function handler(req, res) {
    const { salesOrderItemId = null, field = "id", parentSalesOrderItemId = null, itemId = null } = req.body;

    let fetchAPI = ''

    if(field != "id") {
      fetchAPI = `${host}/horizon%20order/Sales%20Order%20Item?$filter="_item id" eq '${itemId}' and "_parent order item id" eq '${parentSalesOrderItemId}'`
    } else {
      fetchAPI = `${host}/horizon%20order/Sales%20Order%20Item('${salesOrderItemId}')`
    }

    try {
      let response = await fetch(fetchAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credetials}`
        },
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