const db = require('../db')

//Query que obtiene todos los datos de la tabla piezas, siempre que estén ACTIVAS
let getAll = (done) => {
    db.get().query('select * from piezas where estado=1', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

//Query para insertar los values de una nueva pieza en la base de datos
let createPieza = ({titulo, pieza, coverpieza, descripcion}, done) => {
    db.get().query('insert into piezas (titulo, pieza, coverpieza, registro) values (?, ?, ?, ?)', [titulo,pieza,coverpieza,descripcion], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Query para obtener una pieza según su id
let getPById = (id, done) => {
    db.get().query('select * from piezas where id=?', [id], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Query para obtener la url de una pieza según su id -- necesario???
let getUrlById = (id, done) =>{
    db.get().query('select p.pieza from piezas as p where id=?', [id], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Query para obtener todos los autores de cada pieza -- disable
let getAllAutores = (done) => {
    db.get().query('Select * from tbiautorespiezas inner join autores on fk_autor = autores.id inner join piezas on fk_pieza = piezas.id', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

//Query para obtener todos los autores de una pieza según su id
// let getAutores = (id, done) => {
//     db.get().query('Select * from tbiautorespiezas inner join autores on fk_autor = autores.id inner join piezas on fk_pieza = piezas.id where piezas.id =?', [id], (err,result) => {
//         if(err) return done(err)
//         done(null,result)
//     })
// }

let getAutores = (id) => {
    return new Promise((resolve, reject)=>{
        db.get().query('Select * from tbiautorespiezas inner join autores on fk_autor = autores.id inner join piezas on fk_pieza = piezas.id where piezas.id =?', [id], (err,result) => {
            if(err) return reject(err)
            resolve(result)
        })
    })
}

//Query para obtener todos las categorías de cada pieza
let getCategorias = (id) => {
    return new Promise((resolve, reject)=>{
        db.get().query('select * from tbipiezascat inner join piezas on fk_pieza = piezas.id inner join categorias on fk_categoria = categorias.id where piezas.id=?', [id], (err, result) => {
            if(err) return reject(err)
            resolve(result)
        })
    })
}




module.exports = {
    getAll: getAll,
    createPieza: createPieza,
    getPById: getPById,
    getUrlById: getUrlById,
    getAllAutores: getAllAutores,
    getAutores: getAutores,
    getCategorias: getCategorias
}