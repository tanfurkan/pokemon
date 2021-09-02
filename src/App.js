import {CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/">
                        HomePage
                    </Route>
                    <Route path="/pokemon/:pokemonName" >
                        <div>
                            Pokemon Details
                        </div>
                    </Route>
                    <Route >
                        <div>
                            404
                            <Link to='/'>Go Home</Link>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

