const express = require('express');

const router = express.Router();
const {POSTLogIn, POSTSignUp, GETUserShops, GETLikedUserShops, POSTUserLikeShop, POSTUserDislikeShop} = require('../controllers/b2c/user-controller');
const {verifyToken} = require('../middlewares/auth');

router.post('/log-in', POSTLogIn);
router.post('/sign-up', POSTSignUp);
router.get('/user-shops', verifyToken, GETUserShops);
router.get('/user-liked-shops', verifyToken, GETLikedUserShops);
router.post('/like-shop', verifyToken, POSTUserLikeShop);
router.post('/dislike-shop', verifyToken, POSTUserDislikeShop);

module.exports = router;
