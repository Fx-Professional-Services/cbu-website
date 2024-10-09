"use server";
import SessionAccounting from "../token/session_horizon_accounting";
import SessionOrder from "../token/session_horizon_order";
import SessionParty from "../token/session_horizon_party";

const host = process.env.NEXT_PUBLIC_API_URL;
const filename = process.env.NEXT_PUBLIC_MAIN_FILE_NAME;

export default async function signIn(req, res) {
    const token_party = await SessionParty(req, res);
    const { username, password } = req.body;
    const response = await fetch(
        `${host}/fmi/data/v1/databases/${filename}/layouts/Customer Portal/_find`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token_party}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: [
                    {
                        Username: "==" + username,
                        Password: "==" + password,
                    },
                ],
            }),
        }
    );
    if (response.ok) {
        const data = await response.json();
        const token_order = await SessionOrder(req, res);
        const token_accounting = await SessionAccounting(req, res);
        res.setHeader("Cache-Control", "s-maxage=900")
    
        res.status(200).json({
            message: {
                username: data.response.data[0].fieldData["Party::display name"],
                uid: data.response.data[0].fieldData["id"],
                token_party: token_party,
                token_order: token_order,
                token_accounting: token_accounting
            }
        });
    } else {
        res.status(500).json({ message: "Invalid username or password." });
    }
}
