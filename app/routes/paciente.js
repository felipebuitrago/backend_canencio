const { Router } = require("express");
const { crearPaciente,
        readPacientes,
        readPacienteById,
        updatePaciente,
        deletePaciente } = require('../controllers/pacienteCtrl')
const { validarJWT } = require('../middlewares/validarJwt')


const router = Router();

//create new paciente
router.post('/new', validarJWT, crearPaciente);

//get all pacientes
router.get('/', validarJWT, readPacientes);

//get paciente by id
router.get('/paciente/:id', validarJWT, readPacienteById);

//update paciente
router.put('/update/:id', validarJWT, updatePaciente);

//delete paciente
router.delete('/delete/:id', validarJWT, deletePaciente);

module.exports = router;