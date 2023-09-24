const getDB = require('./getDB.js');
const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');

const unsplash = createApi({
  accessKey: 'E5hrDnHWbTCo1fA4TAslfbZvBnFtcTSPqUKb10nop7k',
  fetch: fetch,
});

console.log('Agregando imágenes en la tabla productos');

async function fetchImageUrls(product_title) {
  const response = await unsplash.search.getPhotos({
    query: product_title,
    page: 1,
    perPage: 1,
  });
  const json = response.response;
  const imageUrl = json.results[0].urls.small;
  return imageUrl;
}

async function insertProductImage(product_title) {
  try {
    const imageUrl = await fetchImageUrls(product_title);
    const pool = await getDB();
    const [result] = await pool.query(
      `
      UPDATE product SET product_image = ?
      WHERE product_title = ?
      `,
      [imageUrl, product_title]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error al agregar las imágenes:', error);
    throw error;
  }
}

const products = [
  'Commodore 64',
  'Atari 2600',
  'Walkman Sony',
  'Compaq Presario',
  'Polaroid SX-70',
  'Nintendo Entertainment System',
  'Sony Trinitron TV',
  'Apple Macintosh',
  'VHS Player',
  'Atari ST',
  'Game Boy',
  'Pentax K1000',
  'Sega Genesis',
  'Motorola DynaTAC',
  'Commodore Amiga',
  'Sega Game Gear',
  'Sony Walkman CD',
  'Commodore VIC-20',
  'Nikon F3',
  'Super Nintendo',
  'Sony Handycam',
  'Atari 5200',
  'Sony Vaio',
  'Game Boy Color',
  'Sega CD',
  'Apple PowerBook',
  'Polaroid OneStep',
  'Sega Master System',
  'Sony PSP',
  'Apple Macintosh SE',
  'Kodak Instamatic',
  'Atari Lynx',
  'Sony Clie',
  'Commodore 128',
  'Nikon FM2',
  'Sega Dreamcast',
  'Sony Watchman',
  'Apple IIGS',
  'Game Boy Advance',
  'Sony Mavica',
  'Commodore Amstrad CPC',
  'Polaroid Spectra',
  'Nintendo GameCube',
  'Sony NetMD',
  'IBM PCjr',
  'Sony Handycam DVD',
  'Sega Game Boy Advance',
  'Commodore PET',
  'Nintendo Super Nintendo Entertainment System',
  'Sony MiniDisc Player',
  'IBM PS/2',
  'Nintendo Game Boy Color',
  'Sony Discman D-50',
  'Apple Macintosh Plus',
  'Sony Trinitron Color TV',
  'VHS Camcorder',
  'Sega Saturn',
];
async function insertProductImages() {
  for (const product of products) {
    await insertProductImage(product);
  }
}

insertProductImages()
  .then(() => {
    console.log('Images added successfully');
  })
  .catch((error) => {
    console.error('Error adding images:', error);
  });
