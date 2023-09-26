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
    res.send({
      error: '400',
      message: 'No encontrado',
    });
  }
};

module.exports = getUserData;
