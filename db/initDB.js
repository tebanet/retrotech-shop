require('dotenv').config();

const getDB = require('./getDB.js');

const initDb = async () => {
  try {
    const pool = await getDB();

    console.log('Eliminando base de datos si existe');

    await pool.query('DROP DATABASE IF EXISTS retrotech_shop;');

    console.log('Creando base de datos');

    await pool.query('CREATE DATABASE retrotech_shop;');

    await pool.query('USE retrotech_shop');

    console.log('Creando tabla de usuarios');
    await pool.query(
      `CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        profile_pic VARCHAR(255),
        bio VARCHAR(255),
        address VARCHAR(100),
        role ENUM('admin', 'user') DEFAULT 'user',
        registrationCode VARCHAR(100),
        recoveryPassCode VARCHAR(100),
        active BOOLEAN DEFAULT false,
        createdAt DATETIME NOT NULL DEFAULT NOW(),
        modifiedAt DATETIME
      );`
    );

    console.log('Creando tabla de productos');
    await pool.query(
      `CREATE TABLE IF NOT EXISTS product(
     product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     product_title VARCHAR(50) NOT NULL,
     product_image VARCHAR(255) NOT NULL,
     category ENUM('videogame', 'pc', 'acessories', 'photo/video') NOT NULL,
     description VARCHAR(1000) NOT NULL,
     price DECIMAL(10,2),
     status ENUM('reserved', 'available', 'sold out') NOT NULL,
     place_of_sale ENUM('online', 'delivery') NOT NULL,
     location ENUM('Andalucía', 'Aragón', 'Asturias', 'Balears', 'Canarias', 'Cantabria','Castilla y León', 'Castilla - La Mancha', 'Catalunya', 'Comunitat Valenciana', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Rioja', 'Ceuta', 'Melilla') NOT NULL,
     id_seller INT UNSIGNED NOT NULL,
     createdAt DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (id_seller) REFERENCES users(id)
     );
    `
    );

    console.log('Creando tabla de pedidos');
    await pool.query(
      `CREATE TABLE orders (
        orderId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_buyer INT UNSIGNED NOT NULL,
        id_seller INT UNSIGNED NOT NULL,
        id_product INT UNSIGNED NOT NULL,
        order_status ENUM('accepted', 'rejected', 'pending') NOT NULL DEFAULT 'pending',
        order_date DATETIME NOT NULL DEFAULT NOW(),
        message VARCHAR(100),
        delivery_status ENUM('delivered', 'bounced', 'delayed'),
        delivery_date DATETIME,
        delivery_place VARCHAR(50) NOT NULL,
        FOREIGN KEY (id_buyer) REFERENCES users(id),
        FOREIGN KEY (id_seller) REFERENCES users(id),
        FOREIGN KEY (id_product) REFERENCES product(product_id)
      );`
    );

    console.log('Creando tabla de valoraciones');
    await pool.query(
      `CREATE TABLE valoraciones (
        id_valoracion INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_buyer INT UNSIGNED NOT NULL,
        id_seller INT UNSIGNED NOT NULL,
        id_product INT UNSIGNED NOT NULL,
        valoracion INT UNSIGNED NOT NULL,
        comentaries VARCHAR(200) NOT NULL,
        valoracion_date DATETIME NOT NULL DEFAULT NOW(),
        FOREIGN KEY (id_product) REFERENCES product(product_id),
        FOREIGN KEY (id_buyer) REFERENCES orders(id_buyer),
        FOREIGN KEY (id_seller) REFERENCES orders(id_seller)
        );`
)

    console.log('Creando administradores en la tabla users');
    await pool.query(`
    INSERT INTO users (email, username, password, active, role)
    VALUES('tebane@gmail.com', 'tebane', '1234abcd!', 1, 'admin'),
          ('kaysera0@icloud.com', 'kaysera14', '1234abcd!', 1, 'admin'),
          ('nadia.garcia.3588@gmail.com', 'nadiag88', '1234abcd!', 1, 'admin'),
          ('janeiro.bruno23@gmail.com', 'bjaneiro90', '1234abcd!', 1, 'admin');`);

    console.log('Creando productos en la tabla productos');
    await pool.query(`
    INSERT INTO product(product_title, product_image, category, price, description, status, place_of_sale, location, id_seller)
    VALUES('MasterSystem', 'img_1', 'videogame', '250.00', '1986 Home Video Game Console', 'available', 'online', 'Asturias', 1),
          ('Playstation1', 'img_2', 'videogame', '135.00', '2000 Home Video Game Console', 'sold out', 'delivery', 'Canarias', 2),
          ('Pentium1', 'img_3', 'pc', '335.00', '1988 Home Pc', 'sold out', 'delivery', 'Cantabria', 3),
          ('Macintosh I', 'img_4', 'pc', '298.00', '1985 Apple Home Pc', 'reserved', 'online', 'Balears', 2),
          ('Swiss+go', 'img_5', 'photo/video', '45.00', '1980 Analogic Photo Camera', 'available', 'Aragón',3),
          ('Kodak EKtar', 'img_6', 'photo/video', '55.00', '1992 Analogic Photo Camera', 'reserved', 'Madrid',1)
    ;
    `);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initDb();
