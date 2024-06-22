'use client'

import {useCallback} from "react";

export default function ({href, children, className, openInNewTab }) {

    const handleDoubleClick = useCallback(() => {
        if (openInNewTab) {
            window.open(href, '_blank', 'noopener, noreferrer');
        } else {
            window.location.href = href;
        }
    }, [href, openInNewTab]);

    return (
        <div onDoubleClick={handleDoubleClick} className={className} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
}