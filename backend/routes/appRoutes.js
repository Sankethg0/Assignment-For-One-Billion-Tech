const {Router} = require('express')
const {signupUser,loginUser} = require('../controllers/userController')
const {saveTodo,getTodosByUser} = require('../controllers/todosController')
const userAuth = require('../middleware/auth')

const router = Router()

router.get('/',(req,res) => {
    res.json({message:"Hello There"})
})

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/saveTodo',userAuth,saveTodo)
router.get('/user/:userId/todos',getTodosByUser)


module.exports = router