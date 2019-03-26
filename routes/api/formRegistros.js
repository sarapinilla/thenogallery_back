var express = require('express');
var router = express.Router();

//Modelos:
const formregistroModel = require('../../models/formRegistro')

//POST http://localhost:3000/api/formregistro/create
router.post('/create', (req,res) => {
    formregistroModel.create(req.body, (err,result)=>{
        if(err) return console.log(err)
        const piezaId = result[0].insertId
        const autorID = result[1].insertId
        formregistroModel.setRelationAP(piezaId, autorID, (err, result) =>{
            console.log(err)
        })
        for(let i=0; i<req.body.categorias.length; i++){
            formregistroModel.setRelationPC(piezaId, req.body.categorias[i], (err,result) =>{
                console.log(err)
            })
        }
        res.json('Todo correstisimo')
        
    })
})




module.exports = router;