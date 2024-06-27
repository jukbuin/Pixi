"use client";

import React, { useState } from "react";
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
            {/*<div onClick={openModal} className="list_Area">*/}
                <p onClick={openModal} style={{textAlign: "left", display:"inline", cursor: "pointer", marginLeft: 20, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{list.title}</p>
            {/*</div>*/}

            <ToDoModal show={showModal} onClose={closeModal}>
                {/*<div className={styles.header}><img style={{display: "inline", verticalAlign: "middle", marginRight: 10}} src="/RecycleBin_small.png" alt="RecycleBin icon"/><h2 style={{display: "inline", verticalAlign: "middle"}}>RecycleBin</h2></div>*/}
                {/*<div className={styles.header2}></div>*/}
                <p style={{marginTop: 50, textAlign: "center"}}>이 폴더는 비어있습니다.</p>
            </ToDoModal>
        </>
    );
};

export default ListModal;
