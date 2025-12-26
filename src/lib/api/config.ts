import { OpenAPI } from "./index";
import { getSession } from "next-auth/react";

export const configureApi = () =>
{
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

    // Use a simple interceptor for tokens
    // Note: For Server Components, we might need a different approach or pass tokens explicitly
    OpenAPI.TOKEN = async () =>
    {
        const session = await getSession();
        return session?.accessToken || "";
    };
};

configureApi();
