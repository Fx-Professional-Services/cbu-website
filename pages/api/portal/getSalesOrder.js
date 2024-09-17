import { base64Credetials, host } from "./credentials";
                
  export default async function handler(req, res) {
    const { salesOrderId } = req.body;
    try {
      let response = await fetch(`${host}/horizon order/Sales Order('${salesOrderId}')`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization":`Basic ${base64Credetials}`
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