const { Router } = require("express");
const { crearUsuario,
        readUsuarios,
        readUsuarioById,
        updateUsuario,
        deleteUsuario } = require('../controllers/usuariosCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new usuario
router.post('/new', validarJWT, crearUsuario); 

//get all usuarios
router.get('/', validarJWT, readUsuarios);

//get usuario by id
router.get('/usuario/:id', validarJWT, readUsuarioById);

//update usuario
router.put('/update/:id', validarJWT, updateUsuario);

//delete usuario
router.delete('/delete/:id', validarJWT, deleteUsuario);

module.exports = router;