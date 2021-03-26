import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bio from "./components/Bio";
import Home from "./components/Home";
import Blog from "./components/Blog";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bio">
          <Bio />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
