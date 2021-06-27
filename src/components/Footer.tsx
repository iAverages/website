import React from "react";
import styles from "../styles/footer.module.css";
import Link from "./Link";

const Footer: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.left}>
                <h3>Pages</h3>
                <Link href={"/about"} label={"Testing"} />
                <Link href={"/projects"} label={"Projects"} />
                <Link href={"/contact"} label={"Contact"} />
            </div> */}
            <div className={styles.center}>
                <img height={200} src={"/logo.png"} alt={"Logo"} />
                <p>©️ {new Date().getFullYear()} Daniel Raybone</p>
            </div>
            <div className={styles.right}>
                <h3>External</h3>
                <div className={styles.links}>
                    <Link href={"https://secure-heaven.com/"} label={"Secure Heaven"} newTab />
                    <Link href={"https://github.com/iAverages"} label={"Github"} newTab />
                    <Link href={"https://paste.danielraybone.com/"} label={"Hastebin"} newTab />
                    <Link href={"https://status.danielraybone.com/"} label={"Status"} newTab />
                </div>
            </div>
        </div>
    );
};

export default Footer;
