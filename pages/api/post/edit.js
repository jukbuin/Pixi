import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().split('T')[0];

    if(req.method === 'POST') {
        // console.log(req.body)
        const client = await connectDB;
        const db = client.db("pixi")
        await db.collection('post').updateOne({_id: new ObjectId(req.body._id)}, {$set : {title : req.body.title, created_at : formattedDate}})
        return res.status(302).redirect('/todo');
    }

}