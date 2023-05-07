const { response } = require("express");
const mongoose = require("mongoose");
const  generarJWT  = require("../helpers/jwt");
const Inventario = require('../models/Inventario');
const Producto = require('../models/Producto');

//CREAR UN NUEVO movimiento de Inventario
const crearMovimiento = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    const movimiento = new Inventario({
        registrado_por: req.name,
        tipo_transaccion: req.body.tipoMovimiento,
        producto: req.body.producto,
        presentacion: req.body.presentacion,
        almacen: req.body.almacen,
        paciente_proveedor: req.body.tercero,
        factura: req.body.factura,
        fecha: req.body.fecha,
        cantidad: req.body.cantidad,
        nota: req.body.nota
    });
    await movimiento.save();

    await Producto.findByIdAndUpdate(req.body.idProducto, {stock : req.body.nuevoStock});

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearMovimiento $$$$$$$",
        newToken: token
    })
}


//LEER TODOS LOS REGISTROS DE MOVIMIENTOS EN EL INVENTARIO
const readMovimientos = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Inventario.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readMovimientos $$$$$$$",
        newToken: token,
        result 
    })
}

module.exports = {
    crearMovimiento,
    readMovimientos
}