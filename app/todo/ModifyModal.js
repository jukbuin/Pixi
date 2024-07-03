"use client";

import React, { useState } from "react";
import styles from "./ToDoModal.module.css";
import ToDoModal from "@/app/todo/ToDoModal";

const ModifyModal = ({list}) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={openModal} className={styles.modify}><img src="/modify.png" alt="수정하기"/></button>

            <ToDoModal show={showModal} onClose={closeModal}>
                <p style={{}}>수정하기</p>
                <p style={{marginTop: 50, fontSize: 18}}>내용 : {list.title}</p>
                <p style={{marginTop: 20, fontSize: 18}}>작성일 : {list.created_at}</p>

            </ToDoModal>
        </>
    );
};

export default ModifyModal;
