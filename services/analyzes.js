/**
 * Analyzes service
 * 
 * @author esteban
 */

const {
    rethinkdb
} = require('../rethinkdb')
const r = require('rethinkdb')

const ANALYZES_TABLE = process.env.ANALYZES_TABLE || 'analyzes'

module.exports = {
    /**
     * Returns all analyzes into ANALYZES_TABLE
     */
    getAnalyzes: () => {
        return new Promise((resolve, reject) => {
            return rethinkdb()
                .then((conn) => r
                    .table(ANALYZES_TABLE)
                    .run(conn, (err, cursor) => {
                        if (err) reject(err);
                        cursor.toArray(function (err, result) {
                            if (err) reject(err);
                            resolve(result)
                        });
                    }));
        })
    }
}