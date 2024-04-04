export default async function handler(req, res) {
    const { token, parent_record_id, child_record_id, config_name, modId } = req.body;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fmi/data/${process.env.NEXT_PUBLIC_FM_API_VERSION}/databases/horizon order/layouts/query: Order Item (CBU website)/records/${parent_record_id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "fieldData": {
                    "_configuration option item id": "",
                    "_item id": "CC7C55B5-251F-453A-BE8E-55CEDDA89C34",
                    "_order id": "163042E8-5C00-4D4C-9F40-7F308DD08668",
                    "_parent order item id": parent_record_id,
                    "level": level + 1,
                    "quantity": "",
                    "record id": 231982
                }
            })
        }
    );
    if (response.status == 401) {
        res.status(401).json({ message: response.statusText });
    } else {
        const data = await response.json();
        res.status(200).json({ message: data });
    }

    //testing
    // res.status(200).json({ message: req.body });
}