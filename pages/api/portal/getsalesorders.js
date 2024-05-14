import { host } from "./credentials";
import { base64Credetials } from "./credentials";

// export default async function handler(req, res) {
//     const { token, user } = req.body;
//     const response = await fetch(
//         `${host}/fmi/data/${version}/databases/horizon order/layouts/query: Sales Orders (CBU website)/_find`,
//         {
//           method: "POST",
//           headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           query: [
//               {
//                   "sales order__PARTY::display name": "==" + user,
//                 },
//               ],
//             }),
//           }
//         );

//     if (response.status == 401) {
//         res.status(401).json({ message: response.statusText });
//     } else {
//         const data = await response.json();
//         console.log(data)
//         res.status(200).json({ message: data.response.data});
//     }
// }
                
  export default async function handler(req, res) {
    const { user } = req.body;
    try {
      let response = await fetch(`${host}/horizon order/Sales Order?$filter="_party id" eq '${user}'`, {
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
      res.status(200).json({ data: data.value});
    }
    } catch (error) {
      console.error('Error:', error);
    }
  
}