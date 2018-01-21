const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');

module.exports = {
    POSTLogIn : POSTLogIn,
    POSTSignUp: POSTSignUp
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

                    // expires in 300 seconds (5 min)
                    const token = jwt.sign(data, req.app.get('secret'), {expiresIn : 1 * 60});

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
                user.password = req.body.password;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.tel = req.body.tel;
                user.codeEmail = makeid();
                user.codeTel = makeid();

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
