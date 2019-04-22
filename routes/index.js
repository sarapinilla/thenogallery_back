var express = require('express');
var router = express.Router();

let piezasModel = require('../models/pieza')

/* GET home page. */
router.get('/', function (req, res, next) {
  // Recuperar todas las piezas
  piezasModel.getAll(async (err, rowsp) => {
    if (err) return console.log(err)
    console.log(rowsp)
    for (let i = 0; i < rowsp.length; i++) {
      rowsp[i].autores = await getAutorByPieza(rowsp[i].id)
    }
    for (let j = 0; j < rowsp.length; j++) {
      rowsp[j].categorias = await getCatByPieza(rowsp[j].id)
    }
    console.log(rowsp)
    res.render('index', { data: rowsp });
  })
});

router.get('/registro', (req, res) => {
  res.render('registro')
})

// HELPERS!! 

let getAutorByPieza = async (piezaId)=>{
  try{
      let rowsa = await piezasModel.getAutores(piezaId)
      return rowsa
  }catch(err){
      console.log(err.message)
  }
}

let getCatByPieza = async (piezaId)=>{
  try{
      let rowsc = await piezasModel.getCategorias(piezaId)
      return rowsc
  }catch(err){
      console.log(err.message)
  }
}


module.exports = router;
