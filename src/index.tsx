import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./global.css";

// faGithub causes issues? not sure why. doesnt work without this though
// @ts-ignore
library.add(faGithub, faEnvelope);

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
    return (
        <p>
            <a href={href}>{children}</a>
        </p>
    );
};
ReactDOM.render(
    <React.StrictMode>
        <div className={"wrapper"}>
            <div className={"content"}>
                <h1>Hello 👋</h1>
                <section>
                    <h2>Who Am I?</h2>
                    <p>
                        My name is Daniel Raybone, a self taught software developer from the UK, currently studying T-Level
                        Digital Production, Design & Development.
                    </p>
                </section>
                <section>
                    <h2>What Do I Do?</h2>
                    <p>
                        Currently I am focusing on college and my work experience with{" "}
                        <a href="https://nishtha.biz/">Nishtha</a>
                    </p>
                    <p>
                        In my spare time I try to work in various projects, Izanami (Game server control panel), Yin (A Micro
                        Services Discord Bot built with Typescript, MongoDB and Redis)
                    </p>
                </section>
                <section>
                    <h2>Links</h2>
                    <div style={{ display: "flex", gap: "4rem" }}>
                        <Link href="mailto:me@danielraybone.com?subject=Hello">
                            <FontAwesomeIcon icon={"envelope"} size="3x" />
                        </Link>
                        <Link href="https://github.com/iAverages">
                            <FontAwesomeIcon icon={["fab", "github"]} size="3x" />
                        </Link>
                    </div>
                </section>
                <section>
                    <h2>Info</h2>
                    <p>This site is work in progress!</p>
                    <p>Enjoy this gif :)</p>
                    <img alt="gif" src="https://c.tenor.com/r9TC5OqhdQYAAAAC/siesta-tantei-wa-mou-shindeiru.gif" />
                </section>
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
