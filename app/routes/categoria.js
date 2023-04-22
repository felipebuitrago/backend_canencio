const { Router } = require("express");
const { crearCategoria,
        readCategorias,
        readCategoriaById,
        updateCategoria,
        deleteCategoria } = require('../controllers/categoriaCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new categoria
router.post('/new', validarJWT, crearCategoria);

//get all categorias
router.get('/', validarJWT, readCategorias);

//get categoria by id
router.get('/categoria/:id', validarJWT, readCategoriaById);

//update categoria
router.put('/update/:id', validarJWT, updateCategoria);

//delete categoria
router.delete('/delete/:id', validarJWT, deleteCategoria);

module.exports = router;