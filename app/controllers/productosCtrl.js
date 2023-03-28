const { response } = require("express");
const  generarJWT  = require("../helpers/jwt");
const Producto = require('../models/Producto')

//CREAR UN NUEVO PRODUCTO
const crearProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let producto = {
        registradopor: req.uid,
        proveedor: req.body.proveedor,
        isFaja: req.body.isFaja,
        stock: req.body.stock,
        almacen: req.body.almacen,
        presentacion: req.body.presentacion,
        nombre: req.body.nombre,
        idpersonalizado: req.body.idpersonalizado
    }

    const result = new Producto(producto);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearProducto $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readProductos = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.aggregate([
        {
          '$lookup': {
            'from': 'proveedores', 
            'localField': 'proveedor', 
            'foreignField': '_id', 
            'as': 'proveedor'
          }
        }, {
          '$lookup': {
            'from': 'usuarios', 
            'localField': 'registradopor', 
            'foreignField': '_id', 
            'as': 'registradopor'
          }
        }, {
          '$unwind': {
            'path': '$registradopor'
          }
        }, {
          '$unwind': {
            'path': '$proveedor'
          }
        }, {
          '$unset': [
            'registradopor.password','registradopor.__v', 'registradopor._id', 'proveedor.__v', 'proveedor._id'
          ]
        }
    ])

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductos $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER PRODUCTO POR ID
const readProductoById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.findById(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductoById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR PRODUCTO
const updateProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateProducto $$$$$$$",
        newToken: token 
    })
}


//ELIMINAR PRODUCTO
const deleteProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteProducto $$$$$$$",
        newToken: token,
        result
    })
}

module.exports = {
    crearProducto,
    readProductos,
    readProductoById,
    updateProducto,
    deleteProducto
}