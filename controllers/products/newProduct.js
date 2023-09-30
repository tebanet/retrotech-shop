const { createProduct } = require('../../db/queries/produtos/createProduct.js');

const newProductSchema = require('../../schemas/users/newProductSchema.js');

const newProductController = async (req, res, next) => {
  try {
    const {
      product_title,
      category,
      price,
      description,
      status,
      place_of_sale,
      location,
    } = req.body;

    await newProductSchema.validateAsync(req.body);

    const id = await createProduct(
      product_title,
      category,
      price,
      description,
      status,
      place_of_sale,
      location,
      req.userId
    );

    res.send({
      status: 'ok',
      id,
      data: {
        product_title,
        category,
        price,
        description,
        status,
        place_of_sale,
        location,
      },
      message: `${product_title} se ha publicado con éxito.`,
    });
    console.log(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = newProductController;
