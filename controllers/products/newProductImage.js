const jwt = require('jsonwebtoken');
const path = require('path');
const sharp = require('sharp');
const { createPathIfNotExists } = require('../../helpers/generateError');
const addProductImage = require('../../db/queries/produtos/postProductImage');

const HOST =
  'http://' +
  (process.env.HOST || 'localhost') +
  ':' +
  (process.env.PORT || 3000);

async function newProductImage(req, res, next) {
  try {
    const { product_id } = req.body;
    const directory = path.join(__dirname, '..', '..', 'uploads');

    await createPathIfNotExists(directory);

    const originalFileName = req.files.profile_pic.name;
    const extension = path.extname(originalFileName);
    const resizedImage = `Product_${id}${extension}`;

    if (req.files && req.files.profile_pic) {
      await sharp(req.files.profile_pic.data)
        .resize(800, 600)
        .toFile(path.join(directory, resizedImage), (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Imagen comprimida y guardada:', info);
          }
        });
    }

    const picURL = `${HOST}/uploads/${id}/${resizedImage}`;

    const rowsAffected = await addProductImage(product_id, picURL);
    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ninguna imagen para actualizar' });
    }
    return res.json({ product_id, picURL });
  } catch (error) {
    next(error);
  }
}
module.exports = newProductImage;
