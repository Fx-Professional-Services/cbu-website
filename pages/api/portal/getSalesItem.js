import { host } from "./credentials";
import { base64Credetials } from "./credentials";

export default async function handler(req, res) {
    try {
      let response = await fetch(`${host}/horizon%20order/Item?$filter="is sales item" eq 1`, {
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