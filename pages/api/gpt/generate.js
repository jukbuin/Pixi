import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

    if (!openai.apiKey) {
        res.status(500).json({
            error: {
                message: 'OpenAI API key not configured',
            },
        });
        return;
    }

    const question = req.body.question || '';

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                "role": "system",
                "content": `I'm your friend. If you ask me ${question} that is rooted in truth, I will give you the answer to Korean. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"잘 모르겠습니다.\".\n `
            },
            {
                "role": "user",
                "content": question
            }
        ],
        temperature: 0,
        max_tokens: 100,
    });

    const choice = response.choices[0];
    const answer = choice.message.content;
    res.status(200).json({ result: answer });
}