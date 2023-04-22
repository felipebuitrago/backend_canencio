const { Router } = require("express");
const { crearAlmacen,
        readAlmacenes,
        readAlmacenById,
        updateAlmacen,
        deleteAlmacen } = require('../controllers/almacenCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new almacen
router.post('/new', validarJWT, crearAlmacen);

//get all almacenes
router.get('/', validarJWT, readAlmacenes);

//get almacen by id
router.get('/almacen/:id', validarJWT, readAlmacenById);

//update almacen
router.put('/update/:id', validarJWT, updateAlmacen);

//delete almacen
router.delete('/delete/:id', validarJWT, deleteAlmacen);

module.exports = router;