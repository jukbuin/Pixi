"use client";

import React, {useState} from "react";
import styles from "./ToDoModal.module.css";
import ToDoModal from "@/app/todo/ToDoModal";

const ListModal = ({list}) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <p onClick={openModal} style={{
                textAlign: "left",
                cursor: "pointer",
                marginLeft: 20,
                marginRight: 20,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: 440
            }}>{list.title}</p>

            <ToDoModal show={showModal} onClose={closeModal}>
                <p>상세보기</p>
                <p style={{marginTop: 50, fontSize: 18}}>내용 : {list.title}</p>
                <p style={{marginTop: 20, fontSize: 18}}>작성일 : {list.created_at}</p>
            </ToDoModal>
        </>
    );
};

export default ListModal;
