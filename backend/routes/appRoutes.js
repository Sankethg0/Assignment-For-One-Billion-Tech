const {Router} = require('express')
const {signupUser,loginUser} = require('../controllers/userController')
const {saveTodo,getTodosCurrentUser,deleteTodo} = require('../controllers/todosController')
const userAuth = require('../middleware/auth')

const router = Router()

router.get('/',(req,res) => {
    res.json({message:"Hello There"})
})

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/saveTodo',userAuth,saveTodo)
router.get('/home',userAuth,getTodosCurrentUser)
router.post('/deletepost/:todosId',userAuth,deleteTodo)


module.exports = router