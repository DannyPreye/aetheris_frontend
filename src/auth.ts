import Credentials from "next-auth/providers/credentials";
import { AuthService } from "@/lib/api";
import { getServerSession, NextAuthOptions } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";

function parseJwt(token: string)
{
    try {
        return JSON.parse(Buffer.from(token.split('.')[ 1 ], 'base64').toString());
    } catch (e) {
        return null;
    }
}

async function refreshAccessToken(token: JWT)
{
    try {
        const response = await AuthService.postApiV1AuthRefresh({
            refreshToken: token.refreshToken as string,
        });

        if (!response.data) {
            throw response;
        }

        const { accessToken, refreshToken } = response.data;
        const decoded = parseJwt(accessToken);

        return {
            ...token,
            accessToken,
            accessTokenExpires: decoded.exp * 1000,
            refreshToken: refreshToken ?? token.refreshToken,
        } as JWT;
    } catch (error) {
        console.error("RefreshAccessTokenError", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        } as JWT;
    }
}

declare module "next-auth" {
    interface Session
    {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        accessToken?: string;
        error?: "RefreshAccessTokenError";
    }
}

declare module "next-auth/jwt" {
    interface JWT extends Record<string, any>
    {
        id?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: "RefreshAccessTokenError";
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials)
            {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const response = await AuthService.postApiV1AuthLogin({
                        email: credentials.email as string,
                        password: credentials.password as string,
                    });

                    if (response.data?.user && response.data?.tokens) {
                        const { accessToken, refreshToken } = response.data.tokens;
                        const decoded = parseJwt(accessToken);

                        return {
                            id: response.data.user.id,
                            name: `${response.data.user.firstName} ${response.data.user.lastName}`,
                            email: response.data.user.email,
                            accessToken,
                            refreshToken,
                            accessTokenExpires: decoded.exp * 1000,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user })
        {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    accessToken: (user as any).accessToken,
                    refreshToken: (user as any).refreshToken,
                    accessTokenExpires: (user as any).accessTokenExpires,
                } as JWT;
            }

            // Return previous token if the access token has not expired yet (with 30s buffer)
            if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number) - 30 * 1000) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token })
        {
            if (session.user) {
                session.user.id = token.id as string;
            }
            session.accessToken = token.accessToken as string;
            session.error = token.error as any;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        // signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};


export function serverSession(
    ...args: [
        GetServerSidePropsContext[ "req" ],
        GetServerSidePropsContext[ "res" ]
    ] | [ NextApiRequest, NextApiResponse ] | []
)
{
    return getServerSession(...args, authOptions);
}
