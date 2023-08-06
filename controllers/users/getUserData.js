const selectUserData = require('../../db/queries/users/selectUserData');

const getUserData = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await selectUserData(username);
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserData;
