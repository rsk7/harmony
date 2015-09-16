var $ = require("jquery");
var h = require("h-audio");
var React = require("react");
var p2p = require("./p2p.js");
var player = require("./player.js");
var keys = require("./keyboard/keys.js");
var Board = require("./components/board.jsx");

var reactInitialize = function() {
	React.render(<Board/>, document.getElementById("harmony"));
};

var keyboardInitialize = function() {
	$(window).on("keyup", keys.keyup);
	$(window).on("keydown", keys.keydown);
};

var fun = function() {
	window.h = h;
    window.p2p = p2p;
};

var peerSetup = function(id) {
    $("#connectToMe").attr("href", window.location.href + "?" + id);
    $("#connectToMe").append(id);
    var peerId = window.location.search.slice(1);
    if(peerId.length) p2p.connect(peerId);
    p2p.addReceiver(function(data) {
        console.log(data);
    });
};

var initialize = function() {
	reactInitialize();
	keyboardInitialize();
	player.start();
    p2p.open(peerSetup);
	fun();
};

$(initialize);




