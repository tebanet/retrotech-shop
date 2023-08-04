const insertUser = require('./insertUser.js');
const selectUserById = require('./selectUserById.js');
const selectUserByEmail = require('./selectUserByEmail.js');
const selectUserByRegistrationCode = require('./selectUserByRegistrationCode.js');

module.exports = {
  insertUser,
  selectUserById,
  selectUserByEmail,
  selectUserByRegistrationCode,
};
