/**
 * Constants file
 * All environnement variables used by our little bridge.
 * 
 * @author esteban
 */

module.exports = {
    // RethinkDB variables
    RETHINKDB_HOST: process.env.RETHINKDB_HOST || 'localhost',
    RETHINKDB_PORT: process.env.RETHINKDB_PORT || 28015,
    RETHINKDB_DATABASE: process.env.RETHINKDB_DATABASE || 'dev',
    RETHINKDB_USER: process.env.RETHINKDB_USER || 'admin',
    RETHINKDB_PASSWORD: process.env.RETHINKDB_PASSWORD || '',
    // Tables
    ANALYZES_TABLE: process.env.ANALYZES_TABLE || 'analyzes',
    SOURCES_TABLE: process.env.SOURCES_TABLE || 'sources'
}