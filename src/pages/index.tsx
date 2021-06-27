import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import About from "./About";
import Footer from "../components/Footer";
import "../styles/global.module.css";

function Main() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Home} />
                <Route exact path="/project" component={Home} />
                <Route path="*" component={() => <Error error="404 Not found" />} />
            </Switch>
            <Footer />
        </>
    );
}

export default Main;
