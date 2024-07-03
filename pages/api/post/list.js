import {connectDB} from "@/util/database";

export default async function handler(req, res) {
    const email = req.query.email; // 클라이언트로부터 이메일을 쿼리로 받습니다.
    // console.log("email : " + email)
    if (!email) {
        res.status(400).json({error: "Email is required"});
        return;
    }

    const client = await connectDB;
    const db = client.db("pixi");
    const todos = await db.collection('post').find({author : email}).toArray();
    console.log(todos);
    res.status(200).json(todos);
}
