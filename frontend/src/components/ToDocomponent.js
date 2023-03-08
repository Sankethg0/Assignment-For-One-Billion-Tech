import React,{ useEffect,useState } from 'react'
import {getTodoByCurrentUser,createTodo, deleteTodo, updateTodo} from '../utils/HandleApi'
import ToDo from './ToDo'


function ToDocomponent() {
    const [todos, setTodos] = useState([])
    const [text,setText] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState('')
    
    useEffect(() => {
        getTodoByCurrentUser(setTodos)
      }, [])
      const updateMode = (_id,text) => {
        setIsUpdating(true)
        setText('')
        setToDoId(_id)
      }

  return (
    <div><div className="container">
    <h1>ToDo App</h1>
    <div className="top">
      <input type="text" 
      placeholder='Add ToDo'
      value={text}
      onChange={(e) => setText(e.target.value)}
      />

    <div className="add" onClick={isUpdating ? () => updateTodo(toDoId, text, setTodos, setText, setIsUpdating) : () => createTodo(text,setText,setTodos)}>{isUpdating ? "Update" : "Add" }</div>
    </div>
    <div className="list">
      {todos.map((todo) => <ToDo 
      key={todo._id} 
      text={todo.text} 
      updateMode = {() => updateMode(todo._id, todo.text)}
      deleteTodo = {() => deleteTodo(todo._id,setTodos,todos)}
      upd
      />)}
      
    </div>
  </div></div>
  )
}

export default ToDocomponent