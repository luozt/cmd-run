#!/usr/bin/env node

var http = require("http");
var path = require("path");
var fs = require('fs');
var argv = require("minimist")(process.argv.slice(2));
var configFilePathFull = path.join(__dirname, '../config.json');
var config = require(configFilePathFull);

onInit();

/** 初始化 */
function onInit(){
  if(argv['_'].length){
    cmdRun();
  }else{
    cmdConfig();
  }
}

/** 命令配置  */
function cmdConfig(){
  var config = getConfig();

  // 添加命令
  if('string' === typeof argv['a']){
    var cmdKey = argv['a'], cmdValue = argv['v'];

    if(!(cmdKey&&cmdValue)){
      return console.log('cmd-run add cmd fail: ', cmdKey+':'+cmdValue);
    }

    config[cmdKey] = cmdValue;

    console.log('cmd-run add cmd: ', cmdKey+':'+cmdValue);

    writeConfig(config);
  }

  // 删除命令
  if('string' === typeof argv['d']){
    var cmdKey = argv['d'], cmdValue = config[cmdKey];

    if(!(cmdKey&&cmdValue)){
      return console.log('cmd-run delete cmd fail: ', cmdKey+':'+cmdValue);
    }

    delete config[cmdKey];

    console.log('cmd-run delete cmd: ', cmdKey+':'+cmdValue);

    writeConfig(config);
  }

  // 列出查看
  if(argv['l']){
    var arrConfigKeyValues = [];
    for(var key in config){
      arrConfigKeyValues.push(key+': '+config[key]);
    }
    console.log(arrConfigKeyValues.join('\n'));
  }
}

/** 运行命令 */
function cmdRun(){
  var arrCmd = argv['_'] || [];
  arrCmd.forEach(function(cmdKey){
    var cmd = config[cmdKey] || '';

    if('-' === cmd.slice(0,1)){
      return;
    }

    if(cmd){
      var childProcess = require("child_process");
      var exec = childProcess.exec;

      console.log("cmd get [ " + cmd + " ]");

      // 以@:开头的都是使用node执行的文件，不是直接执行的命令
      // @:<fileRelative>
      if('@:' !== cmd.slice(0,2)){
        var child = exec(cmd, function(err, stdout, stderr){
          if(err){
            return console.log("cmd [ "+ cmd +" ] err: " + err);
          }

          console.log("cmd [ " + cmd + " ] success");
        });
      }else{
        var fileRelative = cmd.slice(2),
          fileAbsolute = path.join(__dirname, fileRelative);

        var script = require(fileAbsolute);

        try{
          script();
        }catch(err){
          return console.log("cmd [ "+ cmd +" ] err: " + err);
        }
      }

      switch(cmdKey){
        case 'http-server':
        case 'hs':
          openUrl('http://127.0.0.1:8001/', 8001);
          break;
      }

    }
  });
}

/** 写入配置config并生成文件 */
function writeConfig(configObj){
  fs.writeFile(configFilePathFull, JSON.stringify(configObj), function(err){
    if(err){
      return console.log('writeConfig err: ', err);
    }

    console.log('writeConfig success!');
  });
}

/** 读取配置 */
function getConfig(){
  return require(configFilePathFull);
}

/** 打开浏览器 */
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

