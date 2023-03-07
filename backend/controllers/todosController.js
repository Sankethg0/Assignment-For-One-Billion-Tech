const todoModel = require('../models/todoModel')

module.exports.saveTodo = async (req,res) => {
    const {text} = req.body 

    if(!text){
        return res.status(422).json({error: 'Please Add Todo'})
    }
    req.user.password = undefined;                                                     //To neglect the password getting cahnged along with the mongodb

    const todo = new todoModel({
        text,
        postedBy:req.user,
    })
    todo.save().then(result=>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err);
    })
    
}

module.exports.getTodosCurrentUser = async (req,res) => {
    todoModel.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.deleteTodo = async (req,res) =>{
    const todoId = req.params.Id;

  try {
    const todo = await todoModel.findOneAndDelete({ _id: todoId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

module.exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
    
        const updatedTodo = await todoModel.findByIdAndUpdate(
          id,
          { text },
          { new: true }
        );
    
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.json(updatedTodo);
      } catch (error) {
        console.log(error)
      }
  };