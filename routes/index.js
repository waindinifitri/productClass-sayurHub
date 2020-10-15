const { Router } = require('express');
const router = Router();
const userRoutes = require('./User')


router.get('/', (req,res)=>{
    res.status(200).json({
        message : "Welcome to the sayurHub! Happy Shopping, good people!"
    })
});
router.use('/user', userRoutes)


module.exports = router;


