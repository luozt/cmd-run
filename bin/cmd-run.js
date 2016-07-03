#!/usr/bin/env node

var http = require("http");
var path = require("path");
var argv = require("minimist")(process.argv.slice(2));

var config = require(path.join(__dirname, '../config.json'));

var arrCmd = argv['_'] || [];
var cmd;

arrCmd.forEach(function(cmdKey){
  cmd = config[cmdKey];

  if(cmd){
    var childProcess = require("child_process");
    var exec = childProcess.exec;

    console.log("cmd get [ " + cmd + " ]");

    var child = exec(cmd, function(err, stdout, stderr){
      if(err){
        console.log("cmd [ "+ cmd +" ] err: " + err);
        return;
      }

      console.log("cmd [ " + cmd + " ] success");
    });


    switch(cmdKey){
      case 'http-server':
        openUrl('http://127.0.0.1:8001/', 8001);
        break;
    }

  }
});


/**
 * 打开浏览器
 */
function openUrl (path, callback) {
  var IS_WIN = process.platform.indexOf('win') === 0;
  var escapeShellArg = function(cmd) {
    return '"' + cmd + '"';
  };

  var child_process = require("child_process");
  var cmd = escapeShellArg(path);
  if (IS_WIN) {
    cmd = 'start "" ' + cmd;
  } else {
    if (process.env["XDG_SESSION_COOKIE"] ||
      process.env["XDG_CONFIG_DIRS"] ||
      process.env["XDG_CURRENT_DESKTOP"]) {
      cmd = "xdg-open " + cmd
    } else if (process.env["GNOME_DESKTOP_SESSION_ID"]) {
      cmd = 'gnome-open ' + cmd;
    } else {
      cmd = "open " + cmd;
    }
  }
  child_process.exec(cmd, callback);
}