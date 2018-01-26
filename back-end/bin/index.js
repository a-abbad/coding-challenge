const environment = process.env.NODE_ENV || 'development';

const config = require('../config/' + environment + '.json');
const app = require('../app');
const makeServer = require('./make-server');

const server = makeServer(app);

server.listen(config.PORT, function () {
    console.log(`server listening on`, config.PORT);
});
