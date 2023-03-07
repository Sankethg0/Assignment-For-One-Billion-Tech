import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import ToDo from '../components/ToDo'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListIcon from '@mui/icons-material/List';
import {getTodoByCurrentUser,createTodo, deleteTodo, updateTodo} from '../utils/HandleApi'


const drawerWidth = 240;



const Home = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [text,setText] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState('')
  const {state,dispatch} = useContext(userContext)

  useEffect(() => {
    getTodoByCurrentUser(setTodos)
  }, [])
  const updateMode = (_id,text) => {
    setIsUpdating(true)
    setText('')
    setToDoId(_id)
  }

  
  return (
    <div className="App">
      
      


              <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Assignment For One Billion Technology
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          {['Profile', 'Todo'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AccountBoxIcon /> : <ListIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  navigate('/');
                }}
              >
                Logout
              </Button>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
        <div className="container">
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
      </div>
        </Typography>
      </Box>
    </Box>
    </div>
  )
}

export default Home