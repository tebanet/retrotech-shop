const loginUser = require('./loginUsers.js');
const postUsers = require('./postUsers.js');
const getUserData = require('./getUserData.js');
const getUserOrders = require('./getUserOrders.js');
const patchOffer = require('./patchOffer.js');
const updateUserProfile = require('./updateUserProfile.js');
const validateUser = require('./validateUser.js');

module.exports = {
  loginUser,
  postUsers,
  getUserData,
  getUserOrders,
  patchOffer,
  updateUserProfile,
  validateUser
};

