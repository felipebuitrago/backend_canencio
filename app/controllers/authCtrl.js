const { reponse } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const crearUsuario  = async (req, res = response) => {

    const { email, name, password } = req.body;

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
        await dbUser.save()

        //response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
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

const loginUsuario = async (req, res) => {

    const { email, password } =  req.body;

    try {
        
        const dbUser = await Usuario.findOne({email})

        if( !dbUser ){

            return res.status(400).json({
                ok: false,
                msg: '$$$$$$$ ERROR PUTA CORREO $$$$$$'
            })
        }
        const validPassword = bcrypt.compareSync(password, dbUser.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: '$$$$$$$ ERROR PUTA PASSWORD $$$$$$'
            })
        }
        const token = await generarJWT(dbUser.id,dbUser.name);
        console.log("|$$$| Login |$$$|", dbUser.name, 
        '|$$$|', req.ip, 
        '|$$$|', req.originalUrl, req.method, 
        '|$$$|', new Date(), '|$$$|');
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            rol: dbUser.rol,
            email: dbUser.email,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: '$$$$$ EROR $$$$'
        })
    }
}

const revalidarToken = async (req, res) => {

    const {uid} = req;

    //query db to know email
    const dbUser = await Usuario.findById(uid);

    //generar jwt
    const token = await generarJWT(uid, dbUser.name);

    console.log("|$$$| ReValidarJWT |$$$|", dbUser.name, 
        '|$$$|', req.ip, 
        '|$$$|', req.originalUrl, req.method, 
        '|$$$|', new Date(), '|$$$|');

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        rol: dbUser.rol,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}