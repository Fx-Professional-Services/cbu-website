export default async function handler(req, res) {
    const { token } = req.body;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fmi/data/${process.env.NEXT_PUBLIC_FM_API_VERSION}/databases/Horizon Order/layouts/query: item v1/_find`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: [
                    {
                        "__id":"*"
                    }
                ]
            })
        }
    );
    if (response.status == 401) {
        res.status(401).json({ message: response.statusText });
    } else {
        const data = await response.json();
        res.status(200).json({ message: data });
    }
}