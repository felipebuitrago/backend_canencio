const { response } = require("express");
const  generarJWT  = require("../helpers/jwt");
const Categoria = require('../models/Categoria')

//CREAR UN NUEVO Categoria
const crearCategoria = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    const result = new Categoria(req.body);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearCategoria $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readCategorias = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Categoria.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readCategorias $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER Categoria POR ID
const readCategoriaById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Categoria.findById(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readCategoriaById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR Categoria
const updateCategoria = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Categoria.findByIdAndUpdate(req.params.id,req.body);
    
    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateCategoria $$$$$$$",
        newToken: token, 
        result
    })
}


//ELIMINAR Categoria
const deleteCategoria = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Categoria.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteCategoria $$$$$$$",
        newToken: token,
        result
    })
}

module.exports = {
    crearCategoria,
    readCategorias,
    readCategoriaById,
    updateCategoria,
    deleteCategoria
}