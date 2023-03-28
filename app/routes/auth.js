const { Router } = require("express");
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new user
router.post('/register', crearUsuario);

//login
router.post('/', loginUsuario);

//renew token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;