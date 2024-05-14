import { host } from "./credentials";
import { base64Credetials } from "./credentials";

export default async function handler(req, res) {
    const { id } = req.body;
    try {
      let response = await fetch(`${host}/horizon%20order/Item%20Category?$filter="_category id" eq '${id}'`, {
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
      res.status(200).json({ data: data.value});
    }
    } catch (error) {
      console.error('Error:', error);
    }
}