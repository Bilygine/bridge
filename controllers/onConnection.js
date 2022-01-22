/**
 * Triggered function when a client join the bridge trough socket.
 * 
 * @author esteban
 */

const { getSources, getSourcesByTitle } = require('../services/sources')
const { getAnalyzes } = require('../services/analyzes')
const { searchWords } = require('../services/results')

module.exports = (socket) => {

    let address = socket.conn.remoteAddress
    console.log(`Client #${socket.id} (from ${address}) join the server !`)

    /* Retrieve all sources */
    socket.on('get_sources', async () => socket.emit('RETRIEVE_SOURCES', await getSources()));

    /** Retrieve all analyzes */
    socket.on('get_analyzes', async () => socket.emit('RETRIEVE_ANALYZES', await getAnalyzes()))
  
    /** Search a sources */
    socket.on('search_sources', async (data) => socket.emit('RETRIEVE_SOURCES_SEARCH', await getSourcesByTitle(data)))

    /** Search by occurence */
    socket.on('search_words',  async (data) => socket.emit("RETRIEVE_WORDS_SEARCH", await searchWords(data)))
}