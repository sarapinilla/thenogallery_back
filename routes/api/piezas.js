var express = require('express');
var router = express.Router();

const piezasModel = require('../../models/pieza')

//Obtener la lista de piezas -- Angular: componente galería
//http://localhost:3000/api/piezas
router.get('/', (req,res) => {
    piezasModel.getAll(async (err,rowsp)=>{
        if(err) return console.log(err)
        console.log(rowsp)
        for(let i = 0; i<rowsp.length; i++){
            rowsp[i].autores = await getAutorByPieza(rowsp[i].id)
            
        //    piezasModel.getAutores(rowsp[i].id, (err,rowsa) =>{
        //        rowsp[i].autores = rowsa
        //        console.log(rowsp.autores)
        //    })
        }
        for(let j = 0; j<rowsp.length; j++){
            rowsp[j].categorias = await getCatByPieza(rowsp[j].id)
        }
        res.json(rowsp)
    })
})

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

//Crear una nueva pieza u obra -- Angular: componente formulario
//http://localhost:3000/api/piezas/create
router.post('/create', (req,res) => {
    piezasModel.createPieza(req.body, (err,result)=>{
        if(err) return console.log(err)
        res.json({result})
    })
})

//http://localhost:3000/api/piezas/2
//Redirigir a la url de una pieza según su id -- Angular: componente galería
router.get('/:id', (req,res) => {
    piezasModel.getUrlById(req.params.id, (err, rows) => {
        if(err) return console.log(err)
        res.redirect(rows[0])
    })
})

//Obtener los datos de una pieza completos, inclu el array de autores -- Angular: componente galería -- necesario???
//http://localhost:3000/api/piezas/pieza/2
// router.get('/pieza/:id', (req,res)=> {
//     piezasModel.getPById(req.params.id, (err, rowsp) => {
//         if(err) return console.log(err)
//         piezasModel.getAutores(req.params.id, (err, rowsa) => {
//             if (err) return console.log(err)
//             rowsp[0].autores = rowsa
//             res.json(rowsp[0])
//         })
//     })
// })



module.exports = router;