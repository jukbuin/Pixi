"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import styles from "@/app/components/Modal.module.css";

const MyPCModal = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div onDoubleClick={openModal} className="icon">
                <img src="/RecycleBin.png" alt="Go to RecycleBin"/>
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <div className={styles.header}><img style={{display: "inline", verticalAlign: "middle", marginRight: 10}} src="/RecycleBin_small.png" alt="RecycleBin icon"/><h2 style={{display: "inline", verticalAlign: "middle"}}>RecycleBin</h2></div>
                <div className={styles.header2}></div>
                <p style={{marginTop: 50, textAlign: "center"}}>이 폴더는 비어있습니다.</p>
            </Modal>
        </>
    );
};

export default MyPCModal;
