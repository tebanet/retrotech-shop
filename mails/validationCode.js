const { port } = require('../config.js');

const validationCode = ({ username, registrationCode }) => `
  ¡Bienvenid@ ${username}!

  Por favor, verifica tu usuario a través del http://localhost:${port}/users/validate/${registrationCode}
`;

module.exports = validationCode;
