import React from "react";
import styles from "../styles/footer.module.css";
import Link from "./Link";
import { version } from "../../package.json";
import { useMediaQuery } from "react-responsive";

const Footer: React.FC = () => {
    const swapOrder = useMediaQuery({ query: "(max-width: 601px)" });

    const Left = () => (
        <div id={styles.left} className={styles.column}>
            <h3 className={styles.header}>External</h3>
            <div className={styles.links}>
                <Link href={"https://github.com/iAverages"} label={"Github"} newTab />
                <Link href={"https://paste.danielraybone.com/"} label={"Hastebin"} newTab />
                <Link href={"https://status.danielraybone.com/"} label={"Status"} newTab />
                <Link href={"http://discord.gg/JM3N5ws"} label={"Discord"} newTab />
            </div>
        </div>
    );

    const Center = () => (
        <div id={styles.center} className={styles.column}>
            <img className={styles.logo} height={200} src={"/logo.png"} alt={"Logo"} />
            <p className={styles.copyright}>
                ©️ {new Date().getFullYear()} Daniel Raybone - version <span>{version}</span>
            </p>
        </div>
    );

    const Right = () => (
        <div id={styles.right} className={styles.column}>
            <h3 className={styles.header}>Public Projects</h3>
            <div className={styles.links}>
                <Link href={"https://github.com/iAverages/Yin"} label={"Yin Bot"} newTab />
                <Link href={"https://github.com/iAverages/ImageUploadAPI"} label={"Image Upload API"} newTab />
                <Link href={"https://github.com/iAverages/SkinsAPI"} label={"Minecraft Skins API"} newTab />
                <Link href={"https://github.com/iAverages/website"} label={"Website Source"} newTab />
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <Left />
            {swapOrder ? (
                <>
                    <Right />
                    <Center />
                </>
            ) : (
                <>
                    <Center />
                    <Right />
                </>
            )}
        </div>
    );
};

export default Footer;
