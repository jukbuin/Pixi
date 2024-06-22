"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import styles from "@/app/components/Modal.module.css";

const WarningImages = ({ images }) => {
    return (
        <div className={styles.warningImages}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.url}
                    alt={`Warning ${index}`}
                    className={styles.warningImage}
                    style={{ top: `${image.top}px`, left: `${image.left}px` }}
                />
            ))}
        </div>
    );
};

const FolderModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [warningImages, setWarningImages] = useState([]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setWarningImages([]);
    };

    const triggerMultipleWarnings = () => {
        const imageUrl = "/warning_image_1.png";
        const count = 30;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const newImage = { url: imageUrl, top: getRandomPosition(350), left: getRandomPosition(700) };
                setWarningImages(prevImages => [...prevImages, newImage]);
            }, i * 150); // 1초 간격으로 경고 이미지 추가
        }
    };

    const getRandomPosition = (maxValue) => {
        return Math.floor(Math.random() * maxValue); // 부모 요소 내에서 랜덤한 위치를 설정
    };

    return (
        <>
            <div onDoubleClick={openModal} className="icon">
                <img src="/folder.png" alt="Go to folder" />
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <div className={styles.header}>
                    <img style={{ display: "inline", verticalAlign: "middle", marginRight: 10 }} src="/folder_small.png" alt="Folder icon" />
                    <h2 style={{ display: "inline", verticalAlign: "middle" }}>Folder</h2>
                </div>
                <div className={styles.header2}></div>
                <div className={styles.text} onDoubleClick={triggerMultipleWarnings}>
                    <img style={{ display: "inline", verticalAlign: "middle", marginRight: 10 }} src="/textFile.png" alt="textFile icon" />
                    <p style={{ display: "inline", verticalAlign: "middle" }}>누르면 후회할거</p>
                </div>
                <div className={styles.warning}>
                    <WarningImages images={warningImages} />
                </div>
            </Modal>
        </>
    );
};

export default FolderModal;
