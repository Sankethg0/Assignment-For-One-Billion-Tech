import React, { useContext,useState } from 'react'
import { userContext } from '../App'
import { useNavigate } from 'react-router-dom'
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
import ToDocomponent from '../components/ToDocomponent';
import UserProfile from '../components/UserProfile'



const drawerWidth = 240;



const Home = () => {
  const navigate = useNavigate()
  const [currentComponent, setCurrentComponent] = useState('todo')
  const {state,dispatch} = useContext(userContext)

  const handleClick = (component) => {
    setCurrentComponent(component);
  };

  
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
        <List sx={{flexDirection:`column`}}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleClick('profile')}>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleClick('todo')}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Todo" />
                  </ListItemButton>
                </ListItem>
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
          {currentComponent === 'todo' ? (
              <ToDocomponent />
            ) : currentComponent === 'profile' ? (
              <UserProfile />
            ) : (
              ''
            )}
        </Typography>
      </Box>
    </Box>
    </div>
  )
}

export default Home