const { Router } = require("express");
const { crearProveedor,
        readProveedores,
        readProveedorById,
        updateProveedor,
        deleteProveedor } = require('../controllers/proveedorCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new proveedor
router.post('/new', validarJWT, crearProveedor);

//get all proveedores
router.get('/', validarJWT, readProveedores);

//get proveedores by id
router.get('/proveedor/:id', validarJWT, readProveedorById);

//update proveedores
router.put('/update/:id', validarJWT, updateProveedor);

//delete product
router.delete('/delete/:id', validarJWT, deleteProveedor);

module.exports = router;