const { response } = require("express");
const mongoose = require("mongoose");
const dayjs = require('dayjs');
const  generarJWT  = require("../helpers/jwt");
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');

//query para joins y quitar ciertos campos
const aggregations = [{
      '$lookup': {
        'from': 'proveedores', 
        'localField': 'proveedor', 
        'foreignField': '_id', 
        'as': 'proveedor'
      }
    }, {
      '$lookup': {
        'from': 'almacenes', 
        'localField': 'almacen', 
        'foreignField': '_id', 
        'as': 'almacen'
      }
    },{
      '$lookup': {
        'from': 'categorias', 
        'localField': 'categoria', 
        'foreignField': '_id', 
        'as': 'categoria'
      }
    }, {
      '$unwind': {
        'path': '$proveedor'
      }
    }, {
      '$unset': [
        'proveedor.__v',
        'almacen.__v','almacen.location',
        'categoria.__v','__v'
      ]
    }
]


//CREAR UN NUEVO PRODUCTO
const crearProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    //si son varios almacenes crear instancia en cada uno
    if(req.body.almacen.length > 1 && typeof req.body.almacen !== "string"){
      req.body.almacen.map(async(almacen)=>{
        let producto = {
          proveedor: req.body.proveedor,
          stock: 0,
          almacen: almacen,//difente almacen e id unica diferencia
          presentacion: req.body.presentacion,
          nombre: req.body.nombre,
          categoria:req.body.categoria
        }
        const prod = new Producto(producto);
        await prod.save();
      })
      return res.status(201).json({
        msg:"$$$$$$$ U are going through crearProducto $$$$$$$",
        newToken: token,
      })
    }else{
      let producto = {
        proveedor: req.body.proveedor,
        stock: 0,
        almacen: req.body.almacen,
        presentacion: req.body.presentacion,
        nombre: req.body.nombre,
        categoria:req.body.categoria
      }
  
      const result = new Producto(producto);
      await result.save();
  
      return res.status(201).json({
          msg:"$$$$$$$ U are going through crearProducto $$$$$$$",
          newToken: token,
          result 
      })
    }
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readProductos = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.aggregate(aggregations)
    //let result = await Producto.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductos $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER PRODUCTO POR ID
const readProductoById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    // 1) let result = await Producto.findById(req.params.id);
    let result = await Producto.aggregate(aggregations.concat([
      {
        '$match':
            {
              '_id': { '$eq': new mongoose.Types.ObjectId(req.params.id) }
              // 2) 'nombre': { '$eq': result.nombre }
            }
      }])
    ) 

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductoById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR PRODUCTO
const updateProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.findByIdAndUpdate(req.params.id,req.body);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateProducto $$$$$$$",
        newToken: token,
        result 
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

//TRASLADAR PRODUCTO
const trasladarProducto = async(req, res = response) => {

  const token = await generarJWT(req.uid, req.name);
  
  const {idProductoOrigen, 
    nombreProductoOrigen, 
    cantidad, 
    stockActualOrigen, 
    presentacion, 
    almacenDestino, 
    proveedorID, 
    categoriasIDs, 
    almacenOrigenLiteral, 
    tercero, 
    almacenDestinoLiteral} = req.body;
  
  let destino = await Producto.aggregate(
    [
      {
        $match:{
          almacen: { '$eq': new mongoose.Types.ObjectId(almacenDestino) },
          presentacion : presentacion,
          nombre: nombreProductoOrigen
        }
      }
  ]);

  //realizar movimientos de egreso e ingreso pertinentes
  const movimientoEgreso = new Inventario({
    fecha: dayjs().format('DD/MM/YYYY'),
    tipo_transaccion: "Egreso",
    producto: nombreProductoOrigen,
    presentacion: presentacion,
    cantidad: cantidad,
    almacen: almacenOrigenLiteral,
    paciente_proveedor: tercero,
    factura: "traslado",
    registrado_por: req.name,
    nota: "Trasladado hacia almacen: ".concat(almacenDestinoLiteral)
  });
  const movimientoIngreso = new Inventario({
    fecha: dayjs().format('DD/MM/YYYY'),
    tipo_transaccion: "Ingreso",
    producto: nombreProductoOrigen,
    presentacion: presentacion,
    cantidad: cantidad,
    almacen: almacenDestinoLiteral,
    paciente_proveedor: tercero,
    factura: "traslado",
    registrado_por: req.name,
    nota: "Trasladado desde almacen: ".concat(almacenOrigenLiteral)
  }); 
  await movimientoEgreso.save();
  await movimientoIngreso.save();
  
  if(destino.length === 1){
    const newStockDestino = parseInt(destino[0].stock) + parseInt(cantidad); 
    await Producto.findByIdAndUpdate(destino[0]._id.toString(),{stock:newStockDestino});
  
    const newStockOrigen = parseInt(stockActualOrigen) - parseInt(cantidad); 
    await Producto.findByIdAndUpdate(idProductoOrigen,{stock:newStockOrigen}); 
  }
  else if(destino.length === 0){

    let producto = {
        stock: parseInt(cantidad),
        nombre: nombreProductoOrigen,
        presentacion: presentacion,
        proveedor: proveedorID,
        categoria:  categoriasIDs,
        almacen: almacenDestino,
      }
      const productoDB = new Producto(producto);
      await productoDB.save();
      //actualiza stock del producto donde se toman las existencias
      const newStockOrigen = parseInt(stockActualOrigen) - parseInt(cantidad); 
      await Producto.findByIdAndUpdate(idProductoOrigen,{stock:newStockOrigen});
  }
  let result = await Producto.aggregate(aggregations);
  return res.status(201).json({
      msg:"$$$$$$$ U are going through trasladarProducto $$$$$$$",
      newToken: token,
      result
  })
}

module.exports = {
    crearProducto,
    readProductos,
    readProductoById,
    updateProducto,
    deleteProducto,
    trasladarProducto
}