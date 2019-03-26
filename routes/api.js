var express = require('express');
var router = express.Router();

const apiAutoresRouter = require('./api/autores'); //Angular - componente ficha, form (necesario)
const apiCategoriasRouter = require('./api/categorias'); //Angular - componente form (necesario)
const apiPiezasRouter = require('./api/piezas'); //Angular - componente galería, form (necesario)
const formRegistroRouter = require('./api/formRegistros');
const adminRouter = require('./api/admin')

router.use('/autores', apiAutoresRouter);
router.use('/categorias', apiCategoriasRouter);
router.use('/piezas', apiPiezasRouter);
router.use('/formregistro', formRegistroRouter);
router.use('/admin', adminRouter);


module.exports = router;
