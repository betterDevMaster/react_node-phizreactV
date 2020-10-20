// http://127.0.0.1:9001
// http://localhost:9001

const path = require('path');
const httpServer = require('http');
const cors = require('cors')
const bodyParser = require('body-parser')
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
const express = require('express');
var PORT = 9000;

var httpApp;
var webrtcApp = express();
webrtcApp.use(cors());
webrtcApp.use(bodyParser.urlencoded({ extended: false }))
webrtcApp.use(bodyParser.json())
webrtcApp.use(express.static(path.join(__dirname, 'public')));
webrtcApp.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// webrtcApp.use('*', (req, res) => {
//     res.status(404).json({ msg: 'Not Found' })
// })

const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);
// if user didn't modifed "PORT" object
// then read value from "config.json"
if(PORT === 9000) {
    PORT = config.port;
}

httpApp = httpServer.createServer(webrtcApp);
RTCMultiConnectionServer.beforeHttpListen(httpApp, config);
httpApp = httpApp.listen(process.env.PORT || PORT, process.env.IP || "0.0.0.0", function() {
    RTCMultiConnectionServer.afterHttpListen(httpApp, config);
});

// --------------------------
// socket.io codes goes below

ioServer(httpApp).on('connection', function(socket) {
    RTCMultiConnectionServer.addSocket(socket, config);

    // ----------------------
    // below code is optional

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function(message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});
