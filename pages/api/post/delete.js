import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        const client = await connectDB;
        const db = client.db("pixi")

        await db.collection('post').deleteOne({_id: new ObjectId(JSON.parse(req.body)._id)})
        return res.status(200).json('삭제완료');
    }

}