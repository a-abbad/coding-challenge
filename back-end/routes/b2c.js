const express = require('express');

const router = express.Router();
const userController = require('../controllers/b2c/user-controller');

router.post('/log-in', userController.POSTLogIn);
router.post('/sign-up', userController.POSTSignUp);

module.exports = router;
