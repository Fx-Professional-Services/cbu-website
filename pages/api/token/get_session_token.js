const host = process.env.NEXT_PUBLIC_API_URL;
const main_filename = process.env.NEXT_PUBLIC_MAIN_FILE_NAME;
const bridge_filename = process.env.NEXT_PUBLIC_BRIDGE_FILE_NAME;
const version = process.env.NEXT_PUBLIC_FM_API_VERSION;

const api_username = process.env.NEXT_PUBLIC_USERNAME;
const api_password = process.env.NEXT_PUBLIC_PASSWORD;

// The credentials are encoded to base64
const encodedCredentials = Buffer.from(
    `${api_username}:${api_password}`
).toString("base64");

export default async function handler(req, res) {
    const response = await fetch(
        `${host}/fmi/data/${version}/databases/${main_filename}/sessions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${encodedCredentials}`,    
            },
            body: JSON.stringify({
                fmDataSource: [
                    {
                        database: bridge_filename,
                        username: api_username,
                        password: api_password,
                    },
                    {
                        database: "Horizon Accounting",
                        username: api_username,
                        password: api_password,
                    },
                ],
            }),
        }
    );

    const data = await response.json();
    res.status(200).json({ message: data.response.token });
}