const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken
};

function verifyToken(req, res, next){
    let token = null;

    token =
        (req.query && req.query.token) ||
        (req.body && req.body.token) ||
        (req.headers &&req.headers.token) ||
        (req.params && req.params.token);

    if(token)
        jwt.verify(token, req.app.get("secret"), function(err, decoded) {
            if(decoded !== undefined ) {
                req.user = decoded.user;
                next();
            } else
                res.status(401)
                    .json({
                        status: 401,
                        message: `Authentication required`,
                        details: `Invalid token!`
                    });
        });
    else
        res.status(401)
            .json({
                status: 401,
                message: `Authentication required`,
                details: `You must authenticate with username and password!`
            });
}