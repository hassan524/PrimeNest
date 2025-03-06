import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { apiRoute } from "../../../../../utils/apiRoutes";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required");
                }

                try {
                    const res = await axios.post(apiRoute.login, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const user = res.data;

                    if (user) {
                        return user; 
                    } else {
                        return null; 
                    }
                } catch (error) {
                    console.error("Login Error:", error);
                    throw new Error("Invalid email or password");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.profilePic = user.profilePic || "/default-avatar.png";
                token.token = user.token; // Store the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.profilePic = token.profilePic as string;
            session.user.token = token.token as string;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
