const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
    
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: '$$$$$ ERROR NO TOKEN $$$'
        })
    }

    try {
        const {uid, name} = jwt.verify( token, process.env.SECRET_JWT_SEED )
        console.log("|$$$| validarJWT |$$$|", name, 
        '|$$$|', req.ip, 
        '|$$$|', req.originalUrl, req.method, 
        '|$$$|', new Date(), '|$$$|');

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "$$$$$ FALSE TOKEN $$$$$"
        })
    }

    next()
}

module.exports = {validarJWT}