const db = require('../db')

//Query que obtiene todos los datos de la tabla autores
let getAll = (done) => {
    db.get().query('select * from autores', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

//Query para insertar los values de un nuevo autor en la base de datos
let createAutor = ({nombre,infoautor,imgautor,ig,be,web}, done) => {
    db.get().query('insert into alumnos values (null, ?, ?, ?, ?, ?, ?)', [nombre,infoautor,imgautor,ig,be,web], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Query para obtener un autor según su id
let getAById = (id, done) =>{
    db.get().query('select * from autores where id=?', [id], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Query para obtener las piezas de un autor según su id
let getAutorPiezas = (id, done) => {
    db.get().query('Select * from tbiautorespiezas inner join autores on fk_autor = autores.id inner join piezas on fk_pieza = piezas.id where autores.id =?', [id], (err,result) => {
        if(err) return done(err)
        done(null,result)
    })
}

// let getAutorPiezas = (id) => {
//     return new Promise((resolve,reject)=>{
//         db.get().query('Select * from tbiautorespiezas inner join autores on fk_autor = autores.id inner join piezas on fk_pieza = piezas.id where autores.id =?', [id], (err,result) => {
//             if(err) return reject(err)
//             resolve(null,result)
//         })
//     })
    
// }

module.exports = {
    getAll: getAll,
    createAutor: createAutor,
    getAById: getAById,
    getAutorPiezas: getAutorPiezas
}