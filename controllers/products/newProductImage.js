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
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    const directory = path.join(__dirname, '..', '..', 'profile_pics');

    await createPathIfNotExists(directory);

    const originalFileName = req.files.profile_pic.name;
    const extension = path.extname(originalFileName);
    const resizedImage = `Profile_Pic_${userId}${extension}`;

    if (req.files && req.files.profile_pic) {
      await sharp(req.files.profile_pic.data)
        .resize(200, 200)
        .toFile(path.join(directory, resizedImage), (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Imagen comprimida y guardada:', info);
          }
        });
    }

    const picURL = `${HOST}/profile_pics/${resizedImage}`;

    const rowsAffected = await addProductImage(userId, picURL);
    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ninguna imagen para actualizar' });
    }
    return res.json({ userId, picURL });
  } catch (error) {
    next(error);
  }
}
module.exports = newProductImage;
