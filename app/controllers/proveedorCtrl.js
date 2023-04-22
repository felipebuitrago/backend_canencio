const { response, request } = require("express");
const  generarJWT  = require("../helpers/jwt");
const  Proveedor  = require("../models/Proveedor");

//CREA UN NUEVO PROVEEDOR
const crearProveedor = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    const newProveedor =  new Proveedor(req.body);
    await newProveedor.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearProveedor $$$$$$$",
        newToken: token,
        newDocument: newProveedor 
    })
}

//BUSCA TODOS LOS PROVEEDORES
const readProveedores = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);
    
    let result = await Proveedor.find();
    
    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProveedores $$$$$$$",
        newToken: token,
        result,
    })
}

//BUSCA PROVEEDOR POR ID
const readProveedorById = async(req=request, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Proveedor.findById(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProveedorById $$$$$$$",
        newToken: token,
        result 
    })
}

//ACTUALIZA PROVEEDOR
const updateProveedor = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Proveedor.findByIdAndUpdate(req.params.id,req.body);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateProveedor $$$$$$$",
        newToken: token,
        result
    })
}

//ELIMINA PROVEEDOR
const deleteProveedor = async(req = request, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Proveedor.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteProveedor $$$$$$$",
        newToken: token,
        result 
    })
}


//EXPORTS
module.exports = {
    crearProveedor,
    readProveedores,
    readProveedorById,
    updateProveedor,
    deleteProveedor
}