/**
 * Results service
 * 
 * @author esteban
 */

const {
    rethinkdb
} = require('../rethinkdb')
const r = require('rethinkdb')

const RESULTS_TABLE = process.env.RESULTS_TABLE || 'results'

module.exports = {
    /**
     * Returns all words who matches with input.
     * data: { analyze_id: analyzeIdTarget, input: string }
     */
    searchWords: (data) => {
        if (data === null) {
            return;
        }
        let analyze_id = data.analyze_id;
        let input = data.input
        if (input === null || input.trim() === '' || analyze_id === null) {
            return;
        }
        // TODO: Should be refacto
        return new Promise(resolve =>
            rethinkdb().then((conn) => {
                r.table(RESULTS_TABLE)
                    .get(analyze_id)
                    .run(conn, function (err, cursor) {
                        if (err) throw err;
                        let occurences = []
                        // Iterate on timeline
                        for (let key in cursor.timeline) {
                            let timeUnit = cursor.timeline[key]
                            if (timeUnit !== undefined && timeUnit.hasOwnProperty('words')) {
                                timeUnit.words.forEach(o => {
                                    let word = o.word
                                    if (word.toLowerCase().includes(input.toLowerCase()))
                                        occurences.push({
                                            word: o.word,
                                            time: o.start
                                        })
                                })
                            }
                        }
                        resolve(occurences)
                    });
            }));
    }
}