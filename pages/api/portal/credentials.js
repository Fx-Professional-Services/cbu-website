export const host = process.env.NEXT_PUBLIC_FMI_URL;

const login = process.env.NEXT_PUBLIC_USERNAME;
const password = process.env.NEXT_PUBLIC_PASSWORD;
export const base64Credetials = `${btoa(login + ':' + password)}`