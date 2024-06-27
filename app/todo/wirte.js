'use client'

import {useEffect} from "react";

export default function Write(){

    useEffect(() => {
        const handleFormSubmit = (event) => {
            const titleInput = document.querySelector(".Add_TODO");
            if (titleInput.value.trim() === "") {
                event.preventDefault();
                alert("내용을 입력해 주세요");
            }
        };

        const form = document.querySelector("form");
        form.addEventListener("submit", handleFormSubmit);

        return () => {
            form.removeEventListener("submit", handleFormSubmit);
        };
    }, []);

    return(
        <div style={{marginTop: 50}}>
            <form action="/api/post/new" method="post">
                <input className="Add_TODO" type="text" name="title" placeholder="Add TODO"/>
                <button className="Add_BT" type="submit">Add</button>
            </form>
        </div>
    )
}