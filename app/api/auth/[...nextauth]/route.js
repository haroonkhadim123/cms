import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromiseLogin from "@/lib/logindb"; // ✅ Use login DB client
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const client = await clientPromiseLogin; // ✅ login DB
        const db = client.db("logindb");

        const user = await db
          .collection("login")
          .findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET, // ✅ Must be set
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
