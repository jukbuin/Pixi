'use client'

import Link from "next/link";
import {useEffect, useState} from "react";
import ListModal from "@/app/todo/ListModal";

export default function List({email}) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`/api/post/list?email=${email}`)
            .then(r => r.json())
            .then(setTodos)
            .catch(console.error);
    }, []);

    return (
        <div className="list_Area">
            {
                todos.map((list, i) => (
                    <div className="list-item" key={i}>
                        {/*<Link prefetch={false} href={`/detail/${list._id}`}><p>{list.title}</p></Link>*/}
                        <ListModal list={list}/>
                        <Link href={`/edit/${list._id}`}>수정하기✏️</Link>
                        <span style={{cursor: 'pointer'}}
                              onClick={(e) => {
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
                                          e.target.parentElement.style.opacity = 0;
                                          setTimeout(() => {
                                              e.target.parentElement.style.display = 'none';
                                          }, 1000);
                                      })
                              }}
                        >
                                삭제하기🗑️
                            </span>
                    </div>

                ))}
        </div>
    );
}