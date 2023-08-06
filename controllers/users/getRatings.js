const selectUserRatings = require('../../db/queries/users/selectUserRatings');

const getRatings = async (req, res, next) => {
  try {
    const { username } = req.params;
    const ratings = await selectUserRatings(username);
    res.send({
      status: 'ok',
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRatings;
