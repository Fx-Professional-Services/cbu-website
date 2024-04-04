const host = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;
export default async function handler(req, res) {
    const { token, user } = req.body;
    const response = await fetch(
        `${host}/fmi/data/${version}/databases/Horizon Accounting/layouts/query: invoice v1 (CBU website)/_find`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: [
                    {
                        "PARTY::display name": "==" + user,
                    }
                ]
            })
        }
    );
    if (response.status == 401) {
        res.status(401).json({ message: response.statusText });
    } else if (response.status == 200){
        const data = await response.json();
        res.status(200).json({ message: data.response.data });
    }
    else {
        res.status(500).json({ message: response.statusText });
    }
}