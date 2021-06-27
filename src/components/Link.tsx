import styles from "../styles/link.module.css";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

interface ExtraProps {
    target?: string;
    rel?: string;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    newTab?: boolean;
    href: string;
    label: string;
}

const Link: React.FC<LinkProps> = ({ label, newTab, href, ...rest }) => {
    const extra: ExtraProps = {};
    if (newTab) {
        extra.target = "_blank";
        extra.rel = "noopener noreferrer";
    }

    const isExternal = href.startsWith("http") || newTab;

    return isExternal ? (
        <a href={href} className={styles.link} {...rest} {...extra}>
            {label}
        </a>
    ) : (
        <RouterLink to={href} {...rest}>
            {label}
        </RouterLink>
    );
};

export default Link;
