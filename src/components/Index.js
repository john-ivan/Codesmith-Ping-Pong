import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';

class IndexComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
  }
  render() {
    return (
      <div>
        {/* Changes text based on authentication */}
        { !this.state.authenticated ? (
          <h2>Log in to view player details</h2>
        ) : (
          <h2>Click on a player to view their profile</h2>
        )}
      </div>
    );
  }
}

export default IndexComponent;
