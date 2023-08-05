const { generateError } = require('../../helpers/generateError.js');
const { createProduct } = require('../../db/queries/produtos/createProduct.js');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const newProductController = async (req, res, next) => {
  try {
    const {
      product_title,
      product_image,
      category,
      price,
      description,
      status,
      location,
      place_of_sale,
    } = req.body;

    if (!price) {
      throw generateError(
        'El producto que intentas agregar no tiene precio, por favor define un precio.',
        400
      );
    }

    let imageFileName;

    if (req.files && req.files.image) {
      // // Crio o path do diretório uploads
      const uploadsDir = path.join(__dirname, '../../uploads');

      // Criar diretório se não existe
      await createPathIfNotExists(uploadsDir);

      // // Processar a imagem
      const image = sharp(req.files.image.data);
      image.resize(1000);

      // // Guardo a imagem com um nome aleatório do diretório uploads
      imageFileName = `${nanoid(24)}.jpg`; //nanoid atribui uma cadeia de texto unica a cada imagem

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createProduct(
      product_title,
      imageFileName,
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
      message: `El producto con ${product_title} se ha creado con éxito.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newProductController;
