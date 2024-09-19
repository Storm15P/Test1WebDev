'use strict'

const { response } = require("express");
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "kghgasdyRARWas!.";

function generarTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        username: usuario.username, 
        role: usuario.role,
        iat: moment.unix(),
        exp: moment().add(15, 'minutes').unix()
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        var tokenEnviadoPorUSuario = 
            req.headers.authorization;
        var tokenLimpio = 
            tokenEnviadoPorUSuario.replace('Bearer ', '');
        var payload = jwt.decode(tokenLimpio, secret);
        req.header.UserId = payload.sub;
        // BACKEND recordar el usuario que logueo


 // Asumimos que el payload contiene el objeto del usuario con el rol
        req.header.UserId = payload.sub;
        req.usuario = payload; // Agrega el payload completo al objeto de la solicitud

        
        nextStep();
    }
    catch(ex){
        resp.status(403).send(
            {message: "Token no valido"}
        );
    }
    
}

module.exports = {
    generarTokenUsuario, validarToken
}
