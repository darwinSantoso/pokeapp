import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:name">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
