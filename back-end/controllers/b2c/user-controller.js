module.exports = {
    testAPI : testAPI
};

function testAPI (req, res, next) {
    return res.status(200)
        .json({
            message: 'Hello world',
            success: 1
        });
}
