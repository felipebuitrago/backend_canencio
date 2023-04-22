const { response } = require("express");
const  generarJWT  = require("../helpers/jwt");
const Paciente = require('../models/Paciente')

//CREAR UN NUEVO Paciente
const crearPaciente = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    const result = new Paciente(req.body);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearPaciente $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readPacientes = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Paciente.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readPacientes $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER Paciente POR ID
const readPacienteById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Paciente.findById(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readPacienteById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR Paciente
const updatePaciente = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Paciente.findByIdAndUpdate(req.params.id,req.body);
    
    return res.status(201).json({
        msg:"$$$$$$$ U are going through updatePaciente $$$$$$$",
        newToken: token, 
        result
    })
}


//ELIMINAR Paciente
const deletePaciente = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Paciente.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deletePaciente $$$$$$$",
        newToken: token,
        result
    })
}

module.exports = {
    crearPaciente,
    readPacientes,
    readPacienteById,
    updatePaciente,
    deletePaciente
}