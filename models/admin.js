const db = require('../db')

//Conseguir el acceso a Admin, si el usuario y la contraseña son correctos
let getLoginAccess = (user,password, done) => {
    db.get().query('SELECT * FROM admin WHERE admin.user = ? AND admin.password = ?', [user,password], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

//Update token, una vez que entras
let updateToken = (token, done) => {
    db.get().query('UPDATE admin SET admin.token=?', 
    [token],
    (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}


//Query que obtiene todos los datos de la tabla piezas
let getAllPiezas = (done) => {
    db.get().query('SELECT * FROM piezas', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

//Query para obtener todos los autores de una pieza según su id
let getAutores = (id) => {
    return new Promise((resolve, reject)=>{
        db.get().query('SELECT * FROM tbiautorespiezas INNER JOIN autores ON fk_autor = autores.id INNER JOIN piezas ON fk_pieza = piezas.id WHERE piezas.id =?', [id], (err,result) => {
            if(err) return reject(err)
            resolve(result)
        })
    })
}

//Query para obtener todos las categorías de cada pieza
let getCategorias = (id) => {
    return new Promise((resolve, reject)=>{
        db.get().query('SELECT * FROM tbipiezascat INNER JOIN piezas ON fk_pieza = piezas.id INNER JOIN categorias ON fk_categoria = categorias.id WHERE piezas.id=?', [id], (err, result) => {
            if(err) return reject(err)
            resolve(result)
        })
    })
}

//Query para actualizar los datos (tabla registros)
let updateEstado = (estado,id,done) => {
    db.get().query('UPDATE piezas SET estado=? WHERE id=?',
    [estado,id],
    (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}


module.exports = {
    getLoginAccess: getLoginAccess,
    updateToken: updateToken,
    getAllPiezas: getAllPiezas,
    getAutores: getAutores,
    getCategorias: getCategorias,
    updateEstado: updateEstado
}