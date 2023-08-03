const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");

// Middleware para comprar que o usuário tem autorização / autenticação para continuar
const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw generateError('Falta o Header de autenticação', 401)     
        }
        
        let token;
        
        try {
            token = jwt.verify(authorization,process.env.SECRET)

        }   catch {
            throw generateError('Token Incorreto', 401)
        }
           
        req.userId = token.id
            next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authUser
}