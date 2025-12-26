import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
    async function proxy(req, ev)
    {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        console.log("This is the token", token);
        console.log("This is the path", path);


        if (path.startsWith("/dashboard")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) =>
            {
                const path = req.nextUrl.pathname;

                if (path.startsWith("/api/auth")) {
                    return true;
                }

                const publicRoutes = [
                    "/login",
                    "/register",
                    "/forgot-password",
                    "/reset-password",
                    "/about",
                    "/contact",
                    "/privacy",
                    "/terms",
                    "/pricing",
                    "/features",
                    "/"


                ];

                const isPublicRoute = publicRoutes.some((route) =>
                {
                    if (route === '/') {
                        return path === '/';
                    }
                    return path.startsWith(route);
                });

                if (isPublicRoute) {
                    return true;
                }

                // All other routes require authentication
                return !!token;
            }
        }
    }
);

export const config = {

    matcher: [
        '/((?!_next/static|_next/image|_next/webpack-hmr|api/auth|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
        "/dashboard/:path*"
    ],
};

