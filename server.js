require('dotenv').config();

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
//const bodyParser = require('body-parser');

const app = express();
const { port } = require('./config.js');

// Middleware de autenticação
const { authUser } = require('./middlewares/auth.js');

// Users controllers
const postUsers = require('./controllers/users/postUsers.js');
const loginUser = require('./controllers/users/loginUsers.js');

// Products controllers
const getProductByName = require('./controllers/products/getProductByName.js');
const getProductByCategory = require('./controllers/products/getProductByCategory.js');
const getSingleProduct = require('./controllers/products/getSingleProduct.js');
const getProducts = require('./controllers/products/getProducts.js');
const newProduct = require('./controllers/products/newProduct.js');
const deletesingleProduct = require('./controllers/products/deleteProduct.js');
const getProductByPrice = require('./controllers/products/getProductByPrice.js');
const validateUser = require('./controllers/users/validateUser.js');
const updateUserProfile = require('./controllers/users/updateUserProfile.js');

// middleware que reconhece o ficheiro binário
app.use(fileUpload());

// Middleware que analiza json y examina las solicitudes en las que el encabezado Content-Type coincide con la opción de tipo.
app.use(express.json());
//app.use(bodyParser.json());

// Rutas de Usuario
app.post('/users', postUsers);
app.post('/users/login', loginUser);
app.get('/users/validate/:registrationCode', validateUser);
app.put('/users/update/:id', updateUserProfile);

// Rotas de Produtos
app.post('/', authUser, newProduct); //middleware associado para autenticação
app.get('/', getProducts);
app.get('/product/name/:letter', getProductByName);
app.get('/product/price/:min-:max', getProductByPrice);
app.get('/product/category/:letter', getProductByCategory);
app.get('/product/id/:id', getSingleProduct);
app.delete('/product/:id', authUser, deletesingleProduct);
app.get('/product/:');

// Middleware para mostrar logs request
app.use(morgan('dev'));

// permite abrir o browser com o nome da foto para carregar a mesma
app.use('/uploads', express.static('./uploads'));

// Middleware de 404
app.use((error, req, res, next) => {
  console.error(error);

  // Si el error tiene el nombre "ValidationError", quiere decir que es un error tirado por Joi, así que le ponemos un statusCode 400
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

app.listen(
  port,
  () => `El servidor se está ejecutando en: http://localhost:${port}`
);
