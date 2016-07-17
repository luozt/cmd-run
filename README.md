# cmd-run

## summary

Run some common commands as a short cut here using `cmd-run` npm module to save developing steps and time.

## installation

It needs to be installed globally: `npm i cmd-run -g`

## usage

use command: `cmd-run <command>`

Currently the most common command I am using is `http-server -a 127.0.0.1 -p 8001`.

I put it in `cmd-run` command list and this list will grow gradually.

`<commnad>` list:

* `http-server`: http-server -a 127.0.0.1 -p 8001
* `hs`: http-server -p 8001
* `gf-push`: git push origin HEAD:refs/heads/master
* `clear.npm`: help you remove and clear the current working path's `node_modules` dir


