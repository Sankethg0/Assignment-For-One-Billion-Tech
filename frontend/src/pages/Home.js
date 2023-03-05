import React, { useEffect, useState } from 'react'
import ToDo from '../components/ToDo'
import { addToDo, getAllToDo,updateToDo,deleteTodo } from '../utils/HandleApi';

const Home = () => {
    const [toDo,setTodo] = useState([])
  const [text,setText] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState('')

  useEffect( () =>{
    getAllToDo(setTodo)
  },[])

  const updateMode = (_id,text) => {
    setIsUpdating(true)
    setText('')
    setToDoId(_id)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" 
          placeholder='Add ToDo'
          value={text}
          onChange={(e) => setText(e.target.value) }/>

          <div className="add" onClick={ isUpdating ? () => updateToDo(toDoId, text, setTodo, setText, setIsUpdating) : () => addToDo(text,setText,setTodo)}>{isUpdating ? "Update" : "Add" }</div>
        </div>
        <div className="list">
          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text} 
          updateMode = {() => updateMode(item._id, item.text)} 
          deleteTodo = {() => deleteTodo(item._id,setTodo)}/>)}
        </div>
      </div>
    </div>
  )
}

export default Home