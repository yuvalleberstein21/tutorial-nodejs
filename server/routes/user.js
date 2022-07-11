const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addUser', userController.form);
router.post('/addUser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewAll);
router.get('/:id', userController.delete);





module.exports = router;