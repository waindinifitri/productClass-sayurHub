const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/User');
const { authentication } = require('../middlewares/auth');

router.get('/list', authentication, UserController.getAllUser)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.put('/edit/:id', authentication, UserController.editUser)
router.get('/find/:id', authentication, UserController.findById)

module.exports = router;
