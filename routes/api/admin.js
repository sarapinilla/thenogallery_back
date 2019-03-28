var express = require('express');
var router = express.Router();

const adminModel = require('../../models/admin')
let tokengn = require('tokengn')

const Promise = require('bluebird');

//GET http://localhost:3000/api/admin/piezas
router.get('/piezas', (req,res) => {
    adminModel.getAllPiezas(async (err,rowsp)=>{
        if(err) return console.log(err)
        console.log(rowsp)
        for(let i = 0; i<rowsp.length; i++){
            rowsp[i].autores = await getAutorByPieza(rowsp[i].id)
        }
        for(let j = 0; j<rowsp.length; j++){
            rowsp[j].categorias = await getCatByPieza(rowsp[j].id)
        }
        res.json(rowsp)
    })
})

let getAutorByPieza = async (piezaId)=>{
    try{
        let rowsa = await adminModel.getAutores(piezaId)
        return rowsa
    }catch(err){
        console.log(err.message)
    }
}

let getCatByPieza = async (piezaId)=>{
    try{
        let rowsc = await adminModel.getCategorias(piezaId)
        return rowsc
    }catch(err){
        console.log(err.message)
    }
}

//POST http://localhost:3000/api/admin/update
router.post('/update', (req,res) =>{
    console.log(req.body)
    //for(let i=0; i<req.body.length; i++){
        adminModel.updateEstado(req.body.estado, req.body.id, (err,result) =>{
            console.log(err)
        })
    //}
    res.json('Todo chachi juani')
})

//LOGIN ADMIN
//POST http://localhost:3000/api/admin/
router.post('/', (req, res) =>{
    adminModel.getLoginAccess(req.body.user, req.body.password,(err, rows) =>{
        if('anillastudio@gmail.com' == req.body.user && 'anilladmin15'== req.body.password){
            if(err) console.log(err)

            let token = tokengn({
                length: 16
            })

            adminModel.updateToken(token, (err,result) => {
                if(err) console.log(err)
                res.json(token)
            })
            

        }else{
            console.log('la vida es dura')
        }
    })
})


module.exports = router;