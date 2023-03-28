const { Router } = require("express");
const { crearProducto,
    readProductos,
    readProductoById,
    updateProducto,
    deleteProducto } = require('../controllers/productosCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new product
router.post('/new', validarJWT, crearProducto);

//get all products
router.get('/', validarJWT, readProductos);

//get products by id
router.get('/product/:id', validarJWT, readProductoById);

//update product
router.put('/update/:id', validarJWT, updateProducto);

//delete product
router.delete('/delete/:id', validarJWT, deleteProducto);

module.exports = router;