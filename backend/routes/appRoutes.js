const {Router} = require('express')
const { signupUser, loginUser, forgotPassword, resetPassword, changePassword ,getUser} = require('../controllers/userController')
const { saveTodo, getTodosCurrentUser, deleteTodo, updateTodo} = require('../controllers/todosController')
const userAuth = require('../middleware/auth')

const router = Router()

router.get('/',(req,res) => {
    res.json({message:"Hello There"})
})

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/saveTodo',userAuth,saveTodo)
router.get('/home',userAuth,getTodosCurrentUser)
router.delete('/deleteTodo/:Id',userAuth,deleteTodo)
router.put('/updateTodo/:id',userAuth,updateTodo)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',resetPassword)
router.post('/reset-password/:id/:token',changePassword)



module.exports = router