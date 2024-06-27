'use client'

import {useEffect, useState} from "react";
import Loading from "@/app/loading";
import Write from "@/app/todo/wirte";
import List from "@/app/todo/list";

export default function Todo() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <div className="ToDoBG">
                    <p style={{color: "white", marginTop: 50}}>{session.user.name}'s Todos  for Today : {formattedDate}</p>
                    <Write/>
                    <List email={session.user.email}/>
                </div>
            </div>
        );
    }
}
