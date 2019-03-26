const mysql = require('mysql')

let pool = null

let connect = (done) => {
    // pool = mysql.createPool({
    //     host: '127.0.0.1',
    //     user:'root',
    //     password:'root',
    //     port: 8889,
    //     database: 'thenogallery3',
    //     multipleStatements: true
    // })
    pool = mysql.createPool({
        host: '127.0.0.1',
        user:'thenogal_thenoga',
        password:'979kqrBD0s',
        port: 3306,
        database: 'thenogal_production',
        multipleStatements: true
    })
    done()
}

let get = () => {
    return pool
}

module.exports = {
    connect: connect,
    get: get
}