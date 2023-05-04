const { response } = require("express");
const mongoose = require("mongoose");
const  generarJWT  = require("../helpers/jwt");
const Producto = require('../models/Producto')

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
  
  const {idProductoOrigen, nombreProductoOrigen, cantidad, stockActualOrigen, presentacion, almacenDestino, proveedorID, categoriasIDs} = req.body;
  
  let existe = await Producto.aggregate(
    [
      {
        $lookup: {
          from: "almacenes",
          localField: "almacen",
          foreignField: "_id",
          as: "almacen"
        }
      },
      {
        $match:{
          nombre: nombreProductoOrigen,
          presentacion: presentacion
        }
      }
    ])
  
  if (existe.length === 2) {
    existe.map(async(current,index) => {
      
      if(current.almacen[0]._id.equals(almacenDestino)){
  
        const newStockDestino = parseInt(current.stock) + parseInt(cantidad); 
        await Producto.findByIdAndUpdate(current._id.toString(),{stock:newStockDestino});
  
        const newStockOrigen = parseInt(stockActualOrigen) - parseInt(cantidad); 
        await Producto.findByIdAndUpdate(idProductoOrigen,{stock:newStockOrigen});

        let result2 = await Producto.aggregate(aggregations)

        return res.status(201).json({
            msg:"$$$$$$$ U are going through trasladarProducto $$$$$$$",
            newToken: token,
            result:result2
        })
      }
    })
  }
  else if(existe.length === 1){
    let producto = {
      stock: cantidad,
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
    
    let result2 = await Producto.aggregate(aggregations)
  
    return res.status(201).json({
        msg:"$$$$$$$ U are going through trasladarProducto $$$$$$$",
        newToken: token,
        result:result2
    })
  }  
}

module.exports = {
    crearProducto,
    readProductos,
    readProductoById,
    updateProducto,
    deleteProducto,
    trasladarProducto
}