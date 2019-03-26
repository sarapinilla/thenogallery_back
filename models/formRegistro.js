const db = require('../db')

//Query para insertar los values de una nueva pieza en la base de datos

let create = ({titulo, pieza, coverpieza, descripcion,nombre, infoautor, email,imgautor,ig, be, web}, done) => {
    db.get().query(
        'INSERT INTO piezas (titulo, pieza, coverpieza,descripcion) values (?, ?, ?, ?); INSERT INTO autores(nombre, infoautor, email,imgautor,ig, be, web) values (?, ?, ?, ?, ?, ?, ?);',
        [titulo,pieza,coverpieza,descripcion,nombre, infoautor, email,imgautor,ig, be, web],
        (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}


//Insert TABLA PIEZA OK
// let createPieza =({titulo, pieza, coverpieza, descripcion}, done) => {
//     db.get().query(
//         'INSERT INTO piezas (titulo, pieza, coverpieza,descripcion) values (?, ?, ?, ?);',
//         [titulo,pieza,coverpieza,descripcion],
//         (err, result) => {
//             if(err) return done(err)
//             done(null, result)
//         })
// }
// //Insert TABLA AUTORES OK
// let createAutor =({nombre, infoautor, email,imgautor,ig, be, web}, done) => {
//     db.get().query(
//         'INSERT INTO autores(nombre, infoautor, email,imgautor,ig, be, web) values (?, ?, ?, ?, ?, ?, ?);', [nombre, infoautor, email,imgautor,ig, be, web],
//         (err, result) => {
//             if(err) return done(err)
//             done(null, result)
//         })
// }

//Insert TBI AUTORES-PIEZA
let setRelationAP = (pieza_id, autor_id, done) => {
    db.get().query('INSERT into tbiautorespiezas VALUES (null, ?, ?)', [pieza_id, autor_id], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let setRelationPC = (pieza_id, cat_id, done) => {
    db.get().query('INSERT into tbipiezascat VALUES (null, ?, ?)', [pieza_id, cat_id], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

module.exports ={
    // createPieza:createPieza,
    // createAutor:createAutor,
    create: create,
    setRelationAP: setRelationAP,
    setRelationPC: setRelationPC

}