"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import styles from "@/app/ components/Modal.module.css";

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
                <img src="/myPC.png" alt="Go to MyPC" />
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <div className={styles.header}><img style={{display: "inline", verticalAlign: "middle", marginRight: 10}} src="/myPC_small.png" alt="myPC icon"/><h2 style={{display: "inline", verticalAlign: "middle"}}>My PC</h2></div>
                <div className={styles.header2}></div>
                <p style={{marginLeft: 70, marginTop: 50}}>장치 및 드라이브</p>
                <img className={styles.disc} src="/Disc.png" alt="Disc image"/>
            </Modal>
        </>
    );
};

export default MyPCModal;
