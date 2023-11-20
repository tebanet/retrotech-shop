const jwt = require('jsonwebtoken');
const modifyUserProfilePic = require('../../db/queries/users/modifyUserProfilePic');
const path = require('path');
const sharp = require('sharp');
const { createPathIfNotExists } = require('../../helpers/generateError');
const { randomUUID } = require('crypto');

//const HOST = 'https://retrotechshop.alwaysdata.net';
const HOST = 'http://' + (process.env.HOST || 'localhost') + ':' + (process.env.PORT || 3000);

async function updateUserProfilePic(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    const uuid = randomUUID();

    const directory = path.join(__dirname, '..', '..', 'profile_pics');

    await createPathIfNotExists(directory);

    const originalFileName = req.files.profile_pic.name;
    const extension = path.extname(originalFileName);
    const resizedImage = `${uuid}${extension}`;

    if (req.files && req.files.profile_pic) {
      await sharp(req.files.profile_pic.data)
        .resize(200, 200)
        .toFile(path.join(directory, resizedImage), (err, info) => {
          if (err) {
            console.error(err);
          } else {
            /* console.log('Imagen comprimida y guardada:', info) */
          }
        });
    }

    const picURL = `${HOST}/profile_pics/${resizedImage}`;

    const rowsAffected = await modifyUserProfilePic(userId, picURL);
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
module.exports = updateUserProfilePic;
