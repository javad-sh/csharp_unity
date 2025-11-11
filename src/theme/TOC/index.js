import React, { useState } from "react";
import clsx from "clsx";
import TOC from "@theme-original/TOC";
import styles from "./styles.module.css";

export default function TOCWrapper({ className, ...props }) {
    const [isVisible, setIsVisible] = useState(true);

    // اضافه/حذف کلاس به body برای تغییر layout
    React.useEffect(() => {
        if (isVisible) {
            document.body.classList.remove('toc-hidden');
        } else {
            document.body.classList.add('toc-hidden');
        }
        return () => {
            document.body.classList.remove('toc-hidden');
        };
    }, [isVisible]);

    const mergedClassName = clsx(className, styles.stickyToc);
    const tocContentClassName = clsx(
        styles.tocContent,
        !isVisible && styles.tocContentHidden
    );

    return (
        <div className={styles.tocContainer}>
            <button
                className={clsx(styles.tocToggle, styles.tocToggleFixed)}
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "مخفی کردن فهرست" : "نمایش فهرست"}
                title={isVisible ? "مخفی کردن فهرست" : "نمایش فهرست"}
            >
                {isVisible ? "◀" : "▶"}
            </button>
            <div className={tocContentClassName}>
                <TOC {...props} className={mergedClassName} />
            </div>
        </div>
    );
}
