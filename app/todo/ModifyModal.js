'use client';

import React, { useEffect, useRef, useState } from "react";
import styles from "./ToDoModal.module.css";
import ToDoModal from "@/app/todo/ToDoModal";

const ModifyModal = ({ list }) => {
    const [showModal, setShowModal] = useState(false);
    const [titleValue, setTitleValue] = useState(list.title);

    const formRef = useRef(null);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTitleValue(list.title);
    };

    useEffect(() => {
        const handleFormSubmit = (event) => {
            const form = formRef.current;
            if (form) {
                const titleInput = form.querySelector("input[name='title']");
                if (titleInput && titleInput.value.trim() === "") {
                    event.preventDefault();
                    alert("내용을 입력해 주세요");
                }
            }
        };

        const form = formRef.current;
        if (form) {
            form.addEventListener("submit", handleFormSubmit);
        }

        return () => {
            if (form) {
                form.removeEventListener("submit", handleFormSubmit);
            }
        };
    }, [showModal]); // showModal 상태가 변경될 때마다 useEffect 실행

    return (
        <>
            <button onClick={openModal} className={styles.modify}><img src="/modify.png" alt="수정하기"/></button>

            <ToDoModal show={showModal} onClose={closeModal}>
                <p>수정하기</p>
                <form ref={formRef} className="ModifyModalForm" action="/api/post/edit" method="post">
                    <input className={styles.textArea} type="text" name="title" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                    <p style={{marginTop: 20, fontSize: 18}} name="created_at">작성일 : {list.created_at}</p>
                    <input type="hidden" name="_id" value={list._id.toString()} />
                    <button className={styles.modifyBT} type="submit">수정</button>
                </form>
            </ToDoModal>
        </>
    );
};

export default ModifyModal;
