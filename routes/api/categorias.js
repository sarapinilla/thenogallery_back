var express = require('express');
var router = express.Router();

const categoriasModel = require('../../models/categoria')

//Obtener la lista de categorías -- Angular: ?
//http://localhost:3000/api/categorias
router.get('/', (req,res) => {
    categoriasModel.getAll((err,rows)=>{
        if(err) return console.log(err)
        res.json(rows)
    })
})

//Obtener las categorías de una pieza u obra -- Angular: componente ficha ???
//http://localhost:3000/api/categorias/pieza/1
router.get('/pieza/:idPieza', (req,res) => {
    categoriasModel.getCByPieza(req.params.id, (err, result) => {
        if(err) return console.log(err)
        res.json(rows)
    })
})

module.exports = router;