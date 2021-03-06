import Navbar from './component/layout/Navbar';
import Home from './component/pages/Home';
import NotFound from './component/pages/NotFound';
import User from './component/users/User';
import Alert from './component/layout/Alert';
import About from './component/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
