const selectUserUnrated = require('../../db/queries/users/selectUserUnrated');
const { getIdByUsername } = require('../../db/queries/users/getIdByUsername');
const { getUsernameByURL } = require('../../db/queries/users/getUsernameByURL');

const getUnrated = async (req, res, next) => {
  try {
    const username = await getUsernameByURL(req.params.username);
    const userId = await getIdByUsername(username);
    const ratings = await selectUserUnrated(userId);
    res.send({
      status: 'ok',
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUnrated;
