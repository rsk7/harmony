var Peer = require("peerjs");

var peer;
var peerId;
var conns = [];
var receivers = [];

var open = function(callback) {
    peer = new Peer({ key: "ei56ntieg54b1emi" });

    peer.on("open", function(id) {
        peerId = id;
        console.log(id);
        callback(id);
    });

    peer.on("connection", setup);
};

var connectOthers = function(ids) {
    ids.forEach(function(id) {
        var alreadyConnected = conns.find(function(cn) {
            return cn.peer === id;
        });

        if (!alreadyConnected && peerId !== id) {
            connect(id);
        }
    });
};

var receiveData = function(conn) {
    conn.on("data", function(data) {
        if(data.type === "request") {
            if(data.cmd === "peers") {
                console.log("sending peers");
                sendPeers(conn);
            }
        }

        if(data.type === "response") {
            console.log("connecting to peers");
            connectOthers(data.peerIds);
        }

        receivers.forEach(function(rcv) {
            rcv(data);
        });
    });
};

var setup = function(conn) {
    conn.on("open", function() {
        receiveData(conn);
        conns.push(conn);
        requestPeers(conn);
    });
};

var requestPeers = function(conn) {
    conn.send({
        type: "request",
        cmd: "peers"
    });
};

var sendPeers = function(conn) {
    var peerIds = conns.map(function(cn) {
        return cn.peer;
    });

    conn.send({
        type: "response",
        peerIds: peerIds
    });
};


var connect = function(id) {
    setup(peer.connect(id));
};

var sender = function(data) {
    conns.forEach(function(conn) {
        conn.send(data);
    });
};

var getId = function() {
    return peerId;
};

var addReceiver = function(receiver) {
    receivers.push(receiver);
};

var getActive = function() {
    return conns;
};

module.exports = {
    id: getId,
    open: open,
    connect: connect,
    active: getActive,
    send: sender,
    addReceiver: addReceiver
};














