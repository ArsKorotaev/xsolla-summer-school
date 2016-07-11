/**
 * Created by a.korotaev on 11.07.16.
 */
var StaticServer = require('static-server');

var server = new StaticServer({
    rootPath: './dist/',
    port: 3000
});

server.start(function () {
    console.log('Server started on port ' + server.port);
});