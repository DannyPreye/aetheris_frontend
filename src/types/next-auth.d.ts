import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session
    {
        accessToken?: string;
        refreshToken?: string;
        user: {
            id: string;
            accessToken?: string;
            refreshToken?: string;
        } & DefaultSession[ "user" ];
    }

    interface User
    {
        id: string;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT
    {
        accessToken?: string;
        refreshToken?: string;
    }
}
