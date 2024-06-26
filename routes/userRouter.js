const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/adduser', userCtrl.adduser)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.get('/users', auth,  userCtrl.getAllUsers)

router.patch('/addcart', auth, userCtrl.addCart)

router.get('/history', auth, userCtrl.history)

router.get('/Allusers', (req, res) => {
    postEmp.find().exec((err, postEmp) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: postEmp
        });

    });
});


router.delete('/user/delete/:id', (req, res) => {
    postEmp.findByIdAndRemove(req.params.id).exec((err, deletedEmp) => {
        if (err)
            return res.status(400).json({
                massage: "Delete unsuccesful",
                err
            });
        return res.json({
            massege: "Delete Succesfully",
            existingPosts:deletedEmp

        });


    });
});


module.exports = router