import { Component, Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';

import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      loading: false,
      users: res.data.items,
    });
  };

  getUser = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https:/api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      loading: false,
      user: res.data,
    });
  };

  getUserRepos = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https:/api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      loading: false,
      repos: res.data,
    });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg: msg, type: type },
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { user, users, loading, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
