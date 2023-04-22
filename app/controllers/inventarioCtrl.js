const { response } = require("express");
const mongoose = require("mongoose");
const  generarJWT  = require("../helpers/jwt");
const Inventario = require('../models/Inventario')

//CREAR UN NUEVO movimiento de Inventario
const crearMovimiento = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let movimiento = {
        registrado_por: req.name,
        tipo_transaccion: "req.body.tipodetransaccion",
        producto: "req.body.producto",
        presentacion: "req.body.talla",
        almacen: "req.body.almacen",
        paciente_proveedor: "req.body.paciente",
        factura: "req.body.factura",
        fecha: new Date(),
        cantidad: 15,
        factura: "req.body.factura456",
        nota: "req.body.nota"
    }

    const result = new Inventario(movimiento);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearMovimiento $$$$$$$",
        newToken: token,
        result 
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