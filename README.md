# cmd-run

## summary

Run some common commands as a short cut here using `cmd-run` npm module to save developing steps and time.

## installation

**Only in Windows**, it can be installed globally: `npm i cmd-run -g`.

In MacOS, it can only be used locally: `npm i cmd-run`, `node ./bin/cmd-run.js http-server`

## usage

use command: `cmd-run <command>`

Currently the most common command I am using is `http-server -a 127.0.0.1 -p 8001`.

I put it in `cmd-run` command list and this list will grow gradually.

Default `<commnad>` list:

* `http-server`: http-server -a 127.0.0.1 -p 8001
* `hs`: http-server -p 8001
* `gf-push`: git push origin HEAD:refs/heads/master
* `clear.npm`: help you remove and clear the current working path's `node_modules` dir

## new features from v1.1.0

Now `cmd-run` supports command list and view, add, delete and so on, as the followings:

* `cmd-run -a push-to-test -v "git push origin HEAD:refs/heads/test"`: add `push-to-test` as the shortcut of `git push origin HEAD:refs/heads/test`
* `cmd-run -d push-to-test`: just delete `push-to-test` command what you just add
* `cmd-run -l`: list the current `cmd-run` config

## TODOS

* `cmd-run` now doesn't support MacOS.

Welcome to make contribution for `cmd-run` at `https://github.com/luozt/cmd-run.git`.
