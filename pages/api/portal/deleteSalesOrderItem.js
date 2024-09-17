import { host } from "./credentials";
import { base64Credetials } from "./credentials";

export default async function handler(req, res) {
    const { salesOrderItemId } = req.body;

    try {
      let response = await fetch(`${host}/horizon%20order/Sales%20Order%20Item('${salesOrderItemId}')`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credetials}`
        }
      });
    
     if (response.status == 401) {
      res.status(401).json({ message: response.statusText });
    } else {
      res.status(204).json({ data: "deleted"});
    }
    } catch (error) {
      console.error('Error:', error);
    }
}