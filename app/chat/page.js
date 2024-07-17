'use client'

import {useEffect, useRef, useState} from 'react';
import Loading from "@/app/loading";

export default function Chat() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const chatAreaRef = useRef(null);

    useEffect(() => {
        fetch('/api/auth/session')
            .then((r) => {
                if (r.status === 200) return r.json();
                return null;
            })
            .then((session) => {
                // console.log("session: " + JSON.stringify(session));
                setSession(session);
                setLoading(false); // 데이터 로딩 완료 후 상태 변경
                if (!session) {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000); // 3초 후 리디렉션
                }
            });
    }, []);

    // 스크롤 자동으로 아래로
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessages = [...messages, { role: "user", content: question }];
        // console.log('전송할 메시지 배열:', messages); // 메시지 배열 출력

        try {
            const response = await fetch('/api/gpt/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`request failed with status ${response.status}`)
                );
            }
            setMessages([...newMessages, { role: "assistant", content: data.result }]);
            setQuestion('');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    if (loading) {
        return <Loading/>
    }

    if (!session) {
        return (
            <div style={{width: 1920, height: 950, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p style={{fontSize: '30px'}}>로그인하고 오세용! 잠시 후 홈으로 이동합니당.</p>
            </div>
        );
    } else {
        return (
            <div style={{width: 1920, height: 950, backgroundColor: "#433B49"}}>
                <div className="ChatBG">
                <form onSubmit={handleSubmit}>
                    <div className="Chat_textArea">
                    <input
                        type='text'
                        placeholder="메세지를 입력하세요."
                        autoFocus
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="Chat_text"
                    />
                    <button className="Chat_send" type='submit'>
                        <img src="/send.png" alt="질문하기"/>
                    </button>
                    </div>
                </form>
                    <div className="Chat_Area" ref={chatAreaRef}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '20px' }}>
                                {msg.role === 'assistant' && (
                                    <img src="/chatprofile.png" alt="chatbotImage" className="Chat_assistantImage" />
                                )}
                                <div className={msg.role === 'user' ? 'Chat_userMessage' : 'Chat_assistantMessage'}>
                                     {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}