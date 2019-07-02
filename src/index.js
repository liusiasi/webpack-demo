// var Header = require("./header");
var avatar = require("./avatar.png");

var img = new Image();
img.src = avatar;
var dom = document.getElementById("root");
dom.append(img);
// new Header();