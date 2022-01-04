import React from "react";
import ReactDOM from "react-dom";
import "./global.css";

ReactDOM.render(
    <React.StrictMode>
        <div className={"wrapper"}>
            <p>This site is work in progress!</p>
            <p>Enjoy this gif instead :)</p>
            <img alt="gif" src="https://c.tenor.com/r9TC5OqhdQYAAAAC/siesta-tantei-wa-mou-shindeiru.gif" />
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
