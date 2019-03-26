var express = require('express');
var router = express.Router();

const autoresModel = require('../../models/autor')


//Obtener la lista de autores o usuarios -- Angular: componente galería
//http://localhost:3000/api/autores

router.get('/', (req, res) => {
    autoresModel.getAll((err, rows) => {
        if (err) return console.log(err)
        res.json(rows)
    })
})

//Crear un nuevo autor o usuario -- Angular: componente formulario
//http://localhost:3000/api/autores/create

// router.post('/create', (req, res) => {
//     console.log(req.body)
//     let objPieza = {
//         titulo: req.body.titulo
//     }
//     let result = await autoresModel.createAutor('LAS COSAS DEL AUTOR')
//     let result2 = await piezasModel.createPieza('LAS COSAS DE LA PIEZA')
//     await autoresModel.insertarTablaIndices('INDICES')

    // autoresModel.createAutor(req.body, (err, result) => {
    //     if (err) return console.log(err)
    //     res.json({ result })
    // })
// })

//Acceder a la ficha de un autor según su id -- Angular: componente galería
//Acceder a los datos de un autor y sus piezas -- Angular: componente ficha ???
//http://localhost:3000/api/autores/2

router.get('/:id', (req, res) => {
    autoresModel.getAById(req.params.id, (err, rowsa) => {
        if (err) return console.log(err)
        autoresModel.getAutorPiezas(req.params.id, (err, rowsp) => {
            if (err) return console.log(err)
            rowsa[0].piezas = rowsp
            res.json(rowsa)
        })
    })

})

module.exports = router;