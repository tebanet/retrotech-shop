const recoveryPassword = ({ recoverPassCode }) => `
Se ha solicitado la recuperación de contraseña para este email en Diaro de Viajes.
Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

Si no has sido tú ignora este email.
`;

module.exports = recoveryPassword;
