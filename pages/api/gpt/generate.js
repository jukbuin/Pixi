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

    const messages = req.body.messages || [];
    // console.log('messages:', messages);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                "role": "system",
                "content": `너의 친구야. 네가 진실에 기반한 질문을 하면 내가 대답을 해줄게. 하지만 말도 안 되는 질문이나 장난스러운 질문을 하면 "잘 모르겠어"라고 답할게.`
            },
            ...messages
        ],
        temperature: 0,
        max_tokens: 300,
    });

    const choice = response.choices[0];
    const answer = choice.message.content;
    res.status(200).json({ result: answer });
}
