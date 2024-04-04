export default async function handler(req, res) {
    const { token } = req.body;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fmi/data/${process.env.NEXT_PUBLIC_FM_API_VERSION}/databases/horizon order/layouts/query: configurator list (CBU website)/records`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}