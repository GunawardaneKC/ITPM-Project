const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)

// router.put('/category/delete-subcategory/:id', categoryCtrl.deleteSubcategory);
router.route('/category/delete-subcategory/:id')
    .put(auth, authAdmin, categoryCtrl.deleteSubcategory)

module.exports = router