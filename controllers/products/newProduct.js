const { createProduct } = require('../../db/queries/produtos/createProduct.js');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
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

    let imageFileName;
    let product_image;

    if (req.files && req.files.product_image) {
      const uploadsDir = path.join(__dirname, '../../uploads');

      await createPathIfNotExists(uploadsDir);

      const image = sharp(req.files.product_image.data);
      const originalFileName = req.files.product_image.name;
      const extension = path.extname(originalFileName);
      image.resize(600, 600);

      imageFileName = `${nanoid(24)}${extension}`;

      await image.toFile(path.join(uploadsDir, imageFileName));

      product_image = imageFileName;
    }

    const id = await createProduct(
      product_title,
      product_image,
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
        product_image,
        category,
        price,
        description,
        status,
        place_of_sale,
        location,
      },
      message: `${product_title} se ha publicado con éxito.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newProductController;
