import { host } from "./credentials";
import { base64Credetials } from "./credentials";

// export default async function handler(req, res) {
//     const { token, id } = req.body;
//     const response = await fetch(
//       `${host}/fmi/data/v1/databases/horizon order/layouts/query: Sales Orders (CBU website)/_find`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           query: [
//             {
//               "Sales Order Item::_order id": "==" + id,
//             },
//           ],
//         }),
//       }
//     );

//     if (response.status == 401) {
//       res.status(401).json({ message: response.statusText });
//     } else {
//       const data = await response.json();
//       res.status(200).json({ message: data.response.data[0].portalData["Sales Order Item"]});
//     }
// }


export default async function handler(req, res) {
    const { id } = req.body;

    try {
      let response = await fetch(`${host}/horizon%20order/Sales%20Order%20Item?$filter="_order id" eq '${id}'`, {
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