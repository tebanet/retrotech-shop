const getUserOffersById = require('../../db/queries/users/getUserOffersById');
const jwt = require('jsonwebtoken');

const getUserOffers = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    const userUsername = decodedToken.username;

    if (userUsername != req.params.username) {
      res.send({
        error: '400',
        message: '¡No eres el dueño de esta cuenta!',
      });

      return;
    }

    const orders = await getUserOffersById(userId);

    res.send({
      status: 'ok',
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOffers;
