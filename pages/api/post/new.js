import {connectDB} from "@/util/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

    if (session) {
        req.body.author = session.user.email
        req.body.author_name = session.user.name
        req.body.created_at = formattedDate
    }
    // console.log("req.body : ",req.body)

    if (req.method === 'POST') {
        const client = await connectDB;
        const db = client.db("pixi");
        await db.collection('post').insertOne(req.body);
        return res.status(302).redirect('/todo');
    }

}