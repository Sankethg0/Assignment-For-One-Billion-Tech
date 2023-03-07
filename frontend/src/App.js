import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import {initialState, reducer} from './reducers/userReducer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'

export const userContext =createContext()

const Routing = () =>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(userContext);
  useEffect (()=>{
      const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        dispatch({type:"USER",payload:user});
      }else{
        navigate('/');
      }
  },[])
  
  return(
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/home/:userid' element={<Home />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <userContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
          <Routing/>
        </BrowserRouter>   
    </userContext.Provider>
  );
}

export default App;
