const { Router } = require("express");
const { crearMovimiento,
        readMovimientos } = require('../controllers/inventarioCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new movimiento
router.post('/new', validarJWT, crearMovimiento);

//get all movimientos
router.get('/', validarJWT, readMovimientos);

module.exports = router;