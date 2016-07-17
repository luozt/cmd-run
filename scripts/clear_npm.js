module.exports = function() {
  var fs = require("fs");
  var path = require('path');
  var childProcess = require("child_process");
  var exec = childProcess.exec;

  var IS_WIN = process.platform.indexOf('win') === 0;

  var folder = 'node_modules';

  var cmd, cmdCatch;
  var cmdWin = 'rd/s/q ' + folder;
  var cmdLin = 'rm -rf ' + folder;

  if (IS_WIN) {
    cmd = cmdWin;
    cmdCatch = cmdLin;
  } else {
    cmd = cmdLin;
    cmdCatch = cmdWin;
  }

  function tryClear() {
    try {
      exec(cmd, function(err, stdout) {
        if (err) {
          return console.log(err);
        }
        console.log('clear success');
      });
    } catch (e) {
      console.log('catch error:');
      console.log(e);

      exec(cmdCatch, function(err, stdout) {
        if (err) {
          return console.log(err);
        }
        console.log('clear success');
      });
    }
  }

  function checkExists(callback) {
    callback = callback || function() {};
    fs.stat(path.join(process.cwd(), './' + folder), function(err, stats) {
      if (err) {
        if (-4058 !== err.errno) {
          return console.log('checkExists err:', err);
        }
        return callback(false);
      }
      var isDir = stats.isDirectory();
      if (isDir) {
        callback(true);
      } else {
        callback(false);
      }
    })
  }

  checkExists(function(isExists) {
    if (isExists) {
      tryClear();
    } else {
      console.log('clear target does not exists');
    }
  })

};