/**
 * Sources service
 * 
 * @author esteban
 */

const {
    rethinkdb
} = require('../rethinkdb')
const r = require('rethinkdb')

const SOURCES_TABLE = process.env.SOURCES_TABLE || 'sources'

module.exports = {
    /**
     * Returns all soures into SOURCES_TABLE
     */
    getSources: () => {
        return new Promise((resolve, reject) => {
            return rethinkdb()
                .then((conn) => r
                    .table(SOURCES_TABLE)
                    .run(conn, (err, cursor) => {
                        if (err) reject(err);
                        cursor.toArray(function (err, result) {
                            if (err) reject(err);
                            resolve(result)
                        });
                    }));
        })
    },
    /**
     * Returns all sources whose title matches with input
     * 
     * @param data - String - Title input
     */
    getSourcesByTitle: (data) => {
        if (data === null) {
            return;
        }
        let regexp = data.trim()
        return new Promise(resolve => {
            rethinkdb().then(function (conn) {
                r.table(SOURCES_TABLE)
                    .filter(function (doc) {
                        return doc('title').match('(?i)' + regexp)
                    })
                    .run(conn, function (err, cursor) {
                        if (err) throw err;
                        cursor.toArray(function (err, result) {
                            if (err) throw err;
                            resolve(result.map(result => result.id));
                        });
                    });
            });
        })
    }
}