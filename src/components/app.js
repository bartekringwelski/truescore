import React, { Component } from 'react';
import UserStats from './user_stats.js';

export default class App extends Component {
  render() {
    // Render test for UserStats; it must be visited from a nav link later
    return (
      <div>React simple started hey!
        <UserStats />
      </div>
    );
  }
}
