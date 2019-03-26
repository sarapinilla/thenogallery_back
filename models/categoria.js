const db = require('../db')

//Query que obtiene todos los datos de la tabla categorias
let getAll = (done) => {
    db.get().query('select * from categorias', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}


module.exports = {
    getAll: getAll
}

