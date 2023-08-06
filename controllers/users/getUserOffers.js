const getUserOffersById = require('../../db/queries/users/getUserOffersById');
const { getUsernameByURL } = require('../../db/queries/users/getUsernameByURL');

const getUserOffers = async (req, res, next) => {
  try {
    const user = await getUsernameByURL(req.params.username);

    if (user != req.headers.username) {
      res.send({
        error: '400',
        message: '¡No eres el dueño de esta cuenta!',
      });

      return;
    }

    const orders = await getUserOffersById(user);

    res.send({
      status: 'ok',
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOffers;
