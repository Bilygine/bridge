/**
 * Connection instance to RethinkDB
 */
const r = require("rethinkdb")
const consts = require('./consts')

/**
 * RethinkDB instance connection
 */
function rethinkdb() {
    return r.connect({
        db: consts.RETHINKDB_DATABASE,
        host: consts.RETHINKDB_HOST,
        port: consts.RETHINKDB_PORT,
        user: consts.RETHINKDB_USER,
        password: consts.RETHINKDB_PASSWORD,
    })
}

function createTableIfNotExists(tableName) {
    return new Promise((resolve, reject) =>
        rethinkdb()
        .then((conn) => {
            r.tableList().run(conn, (err, data) => {
                if (err) throw err;
                if (!data.includes(tableName)) {
                    r.tableCreate(tableName).run(conn)
                    console.log(`${tableName} just created !`)
                } else {
                    console.log(`${tableName} was found.`)
                }
                resolve()
            })
        })
    )
}

module.exports = {
    rethinkdb: () => rethinkdb(),
    /**
     * Listen rethinkdb tables and broadcast changes.
     */
    listenTableChanges: async (io, emitName, tableName) => {
        await createTableIfNotExists(tableName)
        await new Promise(resolve => setTimeout(resolve, 3000))
        rethinkdb()
            .then((conn) => {
                r.table(tableName)
                    .changes()
                    .run(conn, (err, cursor) => {
                        if (err) throw err;
                        cursor.each((err, item) => {
                            if (err) throw err;
                            io.emit(emitName, item);
                        });
                    });
            });
    },
}
