import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, credentials?.email || '', credentials?.password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return {
                id: userCredential.user.uid,
                email: userCredential.user.email,
              };
            }
            return null;
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            return null;
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, full_name: user.name }),
          });

          if (response.ok) {
            const { access_token } = await response.json();
            token.accessToken = access_token;
          } else {
             console.error("Failed to fetch access token from backend");
             token.error = "FailedToFetchToken";
          }
        } catch (error) {
            console.error("Error fetching access token:", error);
            token.error = "FailedToFetchToken";
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if (token.error) {
        session.error = token.error as string;
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };