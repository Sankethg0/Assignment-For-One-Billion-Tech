import M from 'materialize-css'
const baseUrl = "http://localhost:5000"


const getTodoByCurrentUser = (setTodos) => {
    fetch(`${baseUrl}/home`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setTodos(result.mypost)
    })
}

const createTodo = (text, setText, setTodos) => {
    fetch(`${baseUrl}/saveTodo`,{
        method: 'post',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          text
      })
      }).then(res=>res.json())
      .then(data=>{
          
         if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
            console.log(data)
            setText("")
            getTodoByCurrentUser(setTodos)
            M.toast({html:"Item Created Successfully!",classes:"#43a047 green darken-1"})
         }
      }).catch(err=>{
        console.log(err)
    })
}

const deleteTodo = async (todosId, setTodos, todos) =>{
    fetch(`${baseUrl}/deleteTodo/${todosId}`, {
      method: 'DELETE',
      headers: { "Authorization" : "Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json", },
    }).then(res => res.json())
    .then(result => {
        console.log(result)
        const newTodos = todos.filter(setTodos => {
            return setTodos._id !== result._id
        })
        getTodoByCurrentUser(newTodos)
    })
}

export {getTodoByCurrentUser, createTodo, deleteTodo}