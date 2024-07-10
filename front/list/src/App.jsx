import React, { Component } from 'react'
import ToDoList from './components/todolist';
import Post from './components/onepost';
import { Routes,Route } from 'react-router-dom';
class App extends Component {
  render() { 
    return (
      <Routes>
        <Route path='/' element={<ToDoList/>}/>
        <Route path='post/:id/' element={<Post/>}/>
      </Routes>
    );
  }
}
 
export default App;
