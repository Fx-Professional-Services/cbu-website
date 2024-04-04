"use server";
import { data } from "autoprefixer";
import SessionParty from "../token/session_horizon_party";

const host = process.env.NEXT_PUBLIC_API_URL;
const filename = process.env.NEXT_PUBLIC_MAIN_FILE_NAME;

export default async function signIn(req, res) {
    const token = await SessionParty(req, res);
    const { username, password } = req.body;
    const response = await fetch(
        `${host}/fmi/data/v1/databases/${filename}/layouts/Customer Portal/_find`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
        res.status(200).json({
            message: data.response.data[0].fieldData["Party::display name"]
        });
    } else {
        res.status(400).json({ message: data });
        // return new Error("CredentialsSignin");
    }
}
