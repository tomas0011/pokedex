import { Fragment } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    Home
} from '../views';

const Navigation = () => {
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default Navigation;