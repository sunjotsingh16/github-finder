import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ loading: false, users: res.data, alert: null });
  }

  // Search GitHub users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ loading: false, users: res.data.items, alert: null });
  }

  // Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false, alert: null});
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type}});

    setTimeout(() => {
      this.setState({ alert: null});
    }, 3000);
  }

  // Get a single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ loading: false, user: res.data });
  }


  //Get user's repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ loading: false, repos: res.data });
  }


  render() {
    
    const { users, loading, alert, user, repos } = this.state;

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route path="/" exact render={props => (
            <Fragment>
            <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClearButton={ users.length > 0 ? true : false}
            setAlert={this.setAlert}
            />
          <Users loading={loading} users={users} />
          </Fragment>
          )}>
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" render={props =>
            <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading} />
          }/>
        </Switch>
      </div>
    </div>
    </Router>
  );
}
}

export default App;
