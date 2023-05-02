const { response, request } = require("express");
const bcrypt = require('bcryptjs');
const  generarJWT  = require("../helpers/jwt");
const  Usuario  = require("../models/Usuario");

//CREA UN NUEVO Usuario
const crearUsuario = async(req, res = response) => {
    const { email, password, } = req.body;

    try {    
        let usuario = await Usuario.findOne({email:email})
        //consulta existencia de usuario
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "$$$email en uso$$$"
            })
        } 
        //crear usuario con el modelo
        const dbUser = new Usuario(req.body)

        //hash password
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt)

        //jwt
        const token = await generarJWT(dbUser.id,dbUser.name)

        //crear usuario en db
        const result = await dbUser.save()

        //response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            result,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: '$$$$ ERROR $$$$'
        })
    }
    
}

//BUSCA TODOS LOS UsuarioES
const readUsuarios = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);
    
    let result = await Usuario.find().select(["name","email","_id","rol"]);
    
    return res.status(201).json({
        msg:"$$$$$$$ U are going through readUsuarios $$$$$$$",
        newToken: token,
        result,
    })
}

//BUSCA Usuario POR ID
const readUsuarioById = async(req=request, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Usuario.findById(req.params.id).select(["name","email","_id","rol"]);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readUsuarioById $$$$$$$",
        newToken: token,
        result 
    })
}

//ACTUALIZA Usuario
const updateUsuario = async(req, res = response) => {

    const {password} = req.body;
    const token = await generarJWT(req.uid, req.name);

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(password, salt)
    }
    let result = await Usuario.findByIdAndUpdate(req.params.id,req.body).select(["name","email","_id","rol"]);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateUsuario $$$$$$$",
        newToken: token,
        result
    })
}

//ELIMINA Usuario
const deleteUsuario = async(req = request, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Usuario.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteUsuario $$$$$$$",
        newToken: token,
        result 
    })
}

//EXPORTS
module.exports = {
    crearUsuario,
    readUsuarios,
    readUsuarioById,
    updateUsuario,
    deleteUsuario
}