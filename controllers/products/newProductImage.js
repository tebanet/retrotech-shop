const jwt = require('jsonwebtoken');
const path = require('path');
const sharp = require('sharp');
const { createPathIfNotExists } = require('../../helpers/generateError');
const addProductImage = require('../../db/queries/produtos/postProductImage');

async function newProductImage(req, res, next) {
  try {
    const { product_id } = req.body;
    const directory = path.join(__dirname, '..', '..', 'uploads');

    await createPathIfNotExists(directory);

    const originalFileName = req.files.product_image.name;
    const extension = path.extname(originalFileName);
    const resizedImage = `Product_${product_id}${extension}`;

    if (req.files && req.files.product_image) {
      await sharp(req.files.product_image.data)
        .resize(1024, 768)
        .toFile(path.join(directory, resizedImage), (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Imagen comprimida y guardada:', info);
          }
        });
    }

    const rowsAffected = await addProductImage(resizedImage, product_id);
    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ninguna imagen para actualizar' });
    }
    return res.json({ resizedImage, product_id });
  } catch (error) {
    next(error);
  }
}
module.exports = newProductImage;
