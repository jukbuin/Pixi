import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {connectDB} from "@/util/database";

export const authOptions= {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);