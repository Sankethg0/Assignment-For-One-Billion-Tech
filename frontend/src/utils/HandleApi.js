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
    try {
        const response = await fetch(`${baseUrl}/deleteTodo/${todosId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          const newTodos = todos.filter((todo) => todo._id !== todosId);
          setTodos(newTodos);
        }
      } catch (err) {
        console.log(err);
      }
}

const updateTodo = async (toDoId, text,setTodos,setText, setIsUpdating) => {
  try {
    const response = await fetch(`${baseUrl}/updateTodo/${toDoId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: toDoId,
        text: text,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      
      setIsUpdating(false);
      setText('');
      getTodoByCurrentUser(setTodos); 
    }
  } catch (error) {
    console.log(error);
  }
};

export {getTodoByCurrentUser, createTodo, deleteTodo, updateTodo}