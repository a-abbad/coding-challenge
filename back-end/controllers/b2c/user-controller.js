const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
    POSTLogIn,
    POSTSignUp,
    GETUserShops,
    POSTUserLikeShop,
    POSTUserDislikeShop,
    GETLikedUserShops
};

function POSTLogIn(req, res, next) {
    req.checkBody('email', 'Email required').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password should be a string of 6 characters at least').len(6, 64);

    req.getValidationResult()
        .then(errors => {
            if(errors.isEmpty()) {
                return mongoose.model('User')
                    .findOne({email: req.body.email})
                    .exec();
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `The credentials are invalid`,
                        details: errors.mapped()
                    });
            }
        })
        .then(user => {
            if (!user) {
                res.status(401)
                    .json({
                        status: 401,
                        message: `You might have misspelled your username or password!`,
                        details: `Email doesn't exist`
                    });

            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    let data = {
                        user
                    };

                    // expires in 10 hours
                    const token = jwt.sign(data, req.app.get('secret'), {expiresIn : 10 * 60 * 60});

                    res.status(200)
                        .json({
                            token: token
                        });
                } else {
                    res.status(401)
                        .json({
                            status: 401,
                            message: `You might have misspelled your username or password!`,
                            details: `Password didn't match the username`
                        });
                }
            }
        })
        .catch(next);
}

function POSTSignUp(req, res, next) {
    req.checkBody('firstName', 'Invalid first name').notEmpty();
    req.checkBody('lastName', 'Invalid last name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().len(6, 64);

    req.getValidationResult()
        .then(function (errors) {
            if(errors.isEmpty()) {
                return mongoose.model('User')
                    .findOne({email: req.body.email})
                    .exec()
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `All the fields are required`,
                        details: errors.mapped()
                    });
            }
        })
        .then(function(user) {
            if(!user) {
                const User = mongoose.model('User');
                const user = new User;

                user.email = req.body.email;
                user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;

                return user.save()
                    .then(function(user) {
                        let data = {
                            user
                        };

                        // expires in 300 seconds (5 min)
                        const token = jwt.sign(data, req.app.get('secret'), {expiresIn : 1 * 60});

                        res.status(200)
                            .json({
                                token: token
                            });
                    });
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `Email already exist`,
                        details: `choose an other email`
                    });
            }
        })
        .catch(next);
}

function GETUserShops(req, res, next) {
    req.checkQuery('activePage', 'Invalid page number').isNumeric();
    req.checkQuery('pageSize', 'Invalid page size').isNumeric();

    req.getValidationResult()
        .then(errors => {
            if(errors.isEmpty()) {
                return mongoose.model('User')
                    .findOne({_id: req.user._id})
                    .populate('likedShops.shop')
                    .populate('dislikedShops.shop')
                    .exec()
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `Invalid page size and/or page number`,
                        details: errors.mapped()
                    });
            }
        })
        .then(user => {
            const currentPage = +req.query.activePage;
            const itemsPerPage = +req.query.pageSize;

            let ids = [];
            _.map(user.likedShops, likedShop => {ids.push(likedShop.shop._id)});
            _.map(user.dislikedShops, dislikedShop => {ids.push(dislikedShop.shop._id)});

            return Promise.all([
                mongoose.model('Shop')
                    .find({ _id : { $nin : ids } })
                    .skip((currentPage - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                    .exec()
                    .then(data => data),
                mongoose.model('Shop')
                    .find({ _id : { $nin : ids } })
                    .count(total => total )
            ]);
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 200,
                    shops: result[0],
                    total: result[1]
                })
        })
        .catch(err => {
            next(err);
        });
}

function GETLikedUserShops(req, res, next) {
    mongoose.model('User')
        .findOne({_id: req.user._id})
        .populate('likedShops.shop')
        .exec()
        .then(user => {
            res.status(200)
                .json({
                    status: 200,
                    likedShops: user.likedShops
                })
        })
        .catch(err => {
            next(err);
        });
}

function POSTUserLikeShop(req, res, next) {
    req.checkBody('shopId', 'Shop required').notEmpty();

    req.getValidationResult()
        .then(errors => {
            if(errors.isEmpty()) {
                return mongoose.model('User')
                    .findOneAndUpdate(
                        {
                            _id: req.user._id,
                            "likedShops.shop": { $nin: [ req.body.shopId ] }
                        },
                        {
                            $push: { likedShops: { shop: req.body.shopId, dateTime: new Date() } },
                            $pull: { dislikedShops: { shop: req.body.shopId } }
                        },
                        { new: true }
                    )
                    .populate('likedShops.shop')
                    .populate('dislikedShops.shop');
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `Shop required`,
                        details: errors.mapped()
                    });
            }
        })
        .then(user => {
            if (user)
                res.status(200)
                    .json({
                        status: 200,
                        likedShops: user.likedShops,
                        dislikedShops: user.dislikedShops
                    });
            else
                res.status(409)
                    .json({
                        status: 409,
                        message: `Already liked`,
                        details: `You try to like shop that you had already liked!`
                    });

        })
        .catch(next);
}

function POSTUserDislikeShop(req, res, next) {
    req.checkBody('shopId', 'Shop required').notEmpty();

    req.getValidationResult()
        .then(errors => {
            if(errors.isEmpty()) {
                return mongoose.model('User')
                    .findOneAndUpdate(
                        {
                            _id: req.user._id,
                            "dislikedShops.shop": { $nin: [ req.body.shopId ] }
                        },
                        {
                            $push: { dislikedShops: { shop: req.body.shopId, dateTime: new Date() } },
                            $pull: { likedShops: { shop: req.body.shopId } }
                        },
                        { new: true }
                    )
                    .populate('likedShops.shop')
                    .populate('dislikedShops.shop');
            } else {
                res.status(400)
                    .json({
                        status: 400,
                        message: `Shop required`,
                        details: errors.mapped()
                    });
            }
        })
        .then(user => {
            if (user)
                res.status(200)
                    .json({
                        status: 200,
                        likedShops: user.likedShops,
                        dislikedShops: user.dislikedShops
                    });
            else
                res.status(409)
                    .json({
                        status: 409,
                        message: `Already disliked`,
                        details: `You try to dislike shop that you had already disliked!`
                    });

        })
        .catch(next);
}
