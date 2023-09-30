require('dotenv').config();

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
//const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const corsMiddleware = cors({
  origin: [
    'https://retrotech-shop.com',
    'http://localhost:5173',
    'http://localhost:5174',
  ],
});

app.use(corsMiddleware);

const { port } = require('./config.js');

// Middleware de autenticação
const { authUser } = require('./middlewares/auth.js');

// Users controllers
const postUsers = require('./controllers/users/postUsers.js');
const loginUser = require('./controllers/users/loginUsers.js');
const getUserData = require('./controllers/users/getUserData.js');
const getUserOrders = require('./controllers/users/getUserOrders.js');
const validateUser = require('./controllers/users/validateUser.js');
const sendPasswordResetEmail = require('./controllers/users/sendPasswordResetEmail.js');
const changePassword = require('./controllers/users/changePassword.js');
const checkEmail = require('./controllers/users/checkEmail.js');
const updateUserInfo = require('./controllers/users/updateUserInfo.js');
const updateUserProfilePic = require('./controllers/users/updateUserProfilePic.js');
const getUserProducts = require('./controllers/users/getUserProducts.js');
const checkRecoveryToken = require('./controllers/users/checkRecoveryToken.js');
const patchOffer = require('./controllers/users/patchOffer.js');
const patchOrder = require('./controllers/users/patchOrder.js');
const getRatings = require('./controllers/users/getRatings.js');
const rateOrder = require('./controllers/users/rateOrder.js');
const getUserOffers = require('./controllers/users/getUserOffers.js');
const getUnrated = require('./controllers/users/getUnrated.js');

// Products controllers
const getSingleProduct = require('./controllers/products/getSingleProduct.js');
const getProducts = require('./controllers/products/getProducts.js');
const newProduct = require('./controllers/products/newProduct.js');
const deletesingleProduct = require('./controllers/products/deleteProduct.js');
const postOrder = require('./controllers/products/postOrder.js');
const getProductByCategory = require('./controllers/products/productByCategory.js');
const getOrderInfo = require('./controllers/users/getOrderInfo.js');
const getProductByFilter = require('./controllers/products/getProductByFilter.js');
const newProductImage = require('./controllers/products/newProductImage.js');

// middleware que reconhece o ficheiro binário
app.use(fileUpload());

// Middleware que analiza json y examina las solicitudes en las que el encabezado Content-Type coincide con la opción de tipo.
app.use(express.json());
//app.use(bodyParser.json());

// Rutas de Usuario
app.post('/users', postUsers);
app.get('/users/:username/products', getUserProducts);
app.post('/users/login', loginUser);
app.get('/users/:username', getUserData);
app.get('/users/validate/:registrationCode', validateUser);
app.put('/users/update/info/:id', authUser, updateUserInfo);
app.put('/users/update/pic/:id', authUser, updateUserProfilePic);
app.post('/users/reset-password', sendPasswordResetEmail);
app.post('/users/change-password', changePassword);
app.post('/users/check-email', checkEmail);
app.post('/users/check-token', checkRecoveryToken);

// Rutas de Pedidos
app.post('/products/:id/order', authUser, postOrder); // Hacer pedido
app.get('/users/:username/my-orders', authUser, getUserOrders); // Peticiones de compra mandadas
app.get('/users/:username/my-orders/:orderId', authUser, getOrderInfo); // Ver info de cada pedido
app.patch('/users/:username/my-orders/:orderId', authUser, patchOrder); // Cancelar pedidos
app.get('/users/:username/my-offers', authUser, getUserOffers); // Peticiones de compra recibidas
app.patch('/users/:username/my-offers/:orderId', authUser, patchOffer); // Aceptar o rechazar pedidos

// Rutas de valoraciones
app.get('/users/:username/ratings', getRatings); // Ver valoraciones de un perfil
app.get('/users/:username/unrated', getUnrated); //Ver pedidos pendientes de valorar
app.post('/users/:username/my-orders/:orderID/rate', authUser, rateOrder); // Valorar una compra

// Rutas de Produtos
app.post('/products/new', authUser, newProduct); //middleware associado para autenticação
app.post('/products/new-image', authUser, newProductImage);
app.get('/', getProducts);
app.get('/category/:category', getProductByCategory);
app.get('/products/:id', getSingleProduct);
app.delete('/products/:id', authUser, deletesingleProduct);
app.get('/search/', getProductByFilter);

// Middleware para mostrar logs request
app.use(morgan('dev'));

// permite abrir o browser com o nome da foto para carregar a mesma
app.use('/uploads', express.static('./uploads'));
app.use('/profile_pics', express.static('./profile_pics'));

// Middleware de 404
app.use((error, req, res, next) => {
  console.error(error);

  // Custom error handling middleware
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  });

  // Error Joi
  if (error.name === 'ValidationError') {
    error.statusCode = 400;
  }

  res
    .status(error.statusCode || 500)
    .send({ status: 'error', message: error.message });
});

app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () =>
  console.log(`El servidor se está ejecutando en: http://localhost:${port}`)
);
