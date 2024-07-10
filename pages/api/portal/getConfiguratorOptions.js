import { base64Credetials, host } from "./credentials";

export default async function handler(req, res) {
    const { id, field = "_configuration id"} = req.body;
    let fetchAPI = ''

    if(field != "_configuration id") {
      fetchAPI = `${host}/horizon%20order/Configuration%20Option('${id}')`
    } else {
      fetchAPI = `${host}/horizon%20order/Configuration%20Option?$filter="${field}" eq '${id}'`
    }

    try {
      let response = await fetch(`${fetchAPI}`, {
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
      if(data.value){
        res.status(200).json({ data: data.value});
      } else {
        res.status(200).json({ data: data});
      }
    }
    } catch (error) {
      console.error('Error:', error);
    }
}