const { updateProduct } = require('../../db/queries/produtos/updateProduct.js');
const updateProductSchema = require('../../schemas/users/updateProductSchema.js');
const jwt = require('jsonwebtoken');

const updateProductController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    const product_id = req.params.id;

    await updateProductSchema.validateAsync(req.body);

    const updateProductInfo = {
      ...(req.body.product_title && { product_title: req.body.product_title }),
      ...(req.body.category && { category: req.body.category }),
      ...(req.body.price && { price: req.body.price }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.place_of_sale && { place_of_sale: req.body.place_of_sale }),
      ...(req.body.location && { location: req.body.location }),
    };

    const rowsAffected = await updateProduct(
      updateProductInfo.product_title,
      updateProductInfo.category,
      updateProductInfo.price,
      updateProductInfo.description,
      updateProductInfo.place_of_sale,
      updateProductInfo.location,
      product_id
    );

    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ningún dato para actualizar' });
    }
    return res.json(updateProductInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = updateProductController;
