import Credentials from "next-auth/providers/credentials";
import { AuthService } from "@/lib/api";
import { getServerSession, NextAuthOptions } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

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
    }
}

declare module "next-auth/jwt" {
    interface JWT
    {
        id?: string;
        accessToken?: string;
        refreshToken?: string;
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
                        return {
                            id: response.data.user.id,
                            name: `${response.data.user.firstName} ${response.data.user.lastName}`,
                            email: response.data.user.email,
                            accessToken: response.data.tokens.accessToken,
                            refreshToken: response.data.tokens.refreshToken,
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
                token.id = user.id;
                token.accessToken = (user as any).accessToken;
                token.refreshToken = (user as any).refreshToken;
            }
            return token;
        },
        async session({ session, token })
        {
            if (session.user) {
                session.user.id = token.id as string;
            }
            session.accessToken = token.accessToken as string;
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
