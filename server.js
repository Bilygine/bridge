/**
 * Bridge between RethinkDB and a web application trough websocket.
 * Realtime service for Bylgine console.
 * 
 * @author esteban
 */

var sockio = require("socket.io");
var http = require('http');
const {
  listenTableChanges
} = require('./rethinkdb')
const consts = require('./consts')

/** 
 * Env. variables exposed to configure the bridge.
 */
const BRIDGE_PORT = process.env.BRIDGE_PORT || 5005
const BRIDGE_HOST = process.env.BRIDGE_HOST || 'localhost'

const TIMEOUT = process.env.TIMEOUT_CONNECT || 0

const server = http.createServer();
server.listen(BRIDGE_PORT, BRIDGE_HOST);
const io = sockio.listen(server);

console.log('Bridge between Bilygine Console and RethinkDB.');
console.log('Listening on ' + BRIDGE_HOST + ":" + BRIDGE_PORT)

/**
 * Timeout (bypass DB error, shard, replica)
 */
setTimeout(init, TIMEOUT)
if (TIMEOUT > 0) console.log('Wait ' + TIMEOUT + 'ms') 

/**
 * Register tables listening.
 * Register socket event listening.
 */
function init() {
  io.on('connection', require('./controllers').onConnection)

  /* Init rethinkdb listen changes into table */
  listenTableChanges(io, 'UPDATE_ANALYZE', consts.ANALYZES_TABLE)
  listenTableChanges(io, 'UPDATE_SOURCE', consts.SOURCES_TABLE)

  console.log('Ready for Bilygine clients 🚀')
}
