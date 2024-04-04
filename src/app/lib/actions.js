"use server";
import { redirect } from "next/dist/server/api-utils";
import signIn from "../../../pages/api/auth/signIn";

export async function authenticate(__currentState, formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const url = process.env.NEXT_PUBLIC_URL;
    try {
        const signInResponse = await signIn({ body: { username, password } }, 'res');
        res.redirect(307, '/overview/planner');
    } catch (error) {
        if (error) {
            switch (error) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return error.message;
            }
        }
        throw error;
    }
}