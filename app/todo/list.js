'use client'

import { useEffect, useState } from "react";
import ListModal from "@/app/todo/ListModal";
import ModifyModal from "@/app/todo/ModifyModal";

export default function List({ email }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`/api/post/list?email=${email}`)
            .then(r => r.json())
            .then(setTodos)
            .catch(console.error);
    }, [email]);

    const handleDelete = (list) => {
        // 천천히 사라지게하기
        const element = document.getElementById(list._id);
        if (element) {
            element.classList.add('hidden');
            setTimeout(() => {
                fetch('/api/post/delete', {
                    method: 'DELETE',
                    body: JSON.stringify(list),
                })
                    .then((r) => {
                        if (r.ok) {
                            return r.json();
                        } else {
                            throw new Error('삭제 실패');
                        }
                    })
                    .then(() => {
                        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== list._id));
                    })
                    .catch((error) => {
                        console.error('삭제 오류:', error);
                    });
            }, 1000);
        }
    };

    return (
        <div className="list_Area">
            {
                todos.map((list) => (
                    <div className="list-item" key={list._id} id={list._id}>
                        <ListModal list={list} />
                        <ModifyModal list={list} />
                        <button className="delete" onClick={() => handleDelete(list)}>
                            <img src="/trash.png" alt="삭제하기" />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}
