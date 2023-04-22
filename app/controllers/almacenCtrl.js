const { response } = require("express");
const  generarJWT  = require("../helpers/jwt");
const Almacen = require('../models/Almacen')

//CREAR UN NUEVO Almacen
const crearAlmacen = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    const result = new Almacen(req.body);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearAlmacen $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readAlmacenes = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Almacen.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readAlmacenes $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER Almacen POR ID
const readAlmacenById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Almacen.findById(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readAlmacenById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR Almacen
const updateAlmacen = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Almacen.findByIdAndUpdate(req.params.id,req.body);
    
    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateAlmacen $$$$$$$",
        newToken: token, 
        result
    })
}


//ELIMINAR Almacen
const deleteAlmacen = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Almacen.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteAlmacen $$$$$$$",
        newToken: token,
        result
    })
}

module.exports = {
    crearAlmacen,
    readAlmacenes,
    readAlmacenById,
    updateAlmacen,
    deleteAlmacen
}