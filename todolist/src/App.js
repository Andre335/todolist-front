import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Todo List
          </p>
        </header>
        <TaskList />
      </div>
    );
  }
}

export default App;
