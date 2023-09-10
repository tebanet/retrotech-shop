require('dotenv').config();

const getDB = require('./getDB.js');

const initDb = async () => {
  try {
    const pool = await getDB();

    console.log('Eliminando base de datos si existe');

    await pool.query(`DROP DATABASE IF EXISTS ${process.env.MYSQL_DATABASE}`);

    console.log('Creando base de datos');

    await pool.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);

    await pool.query(`USE ${process.env.MYSQL_DATABASE}`);

    console.log('Creando tabla de usuarios');
    await pool.query(
      `CREATE TABLE users (
        id VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
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
     id_seller VARCHAR(50) NOT NULL,
     createdAt DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY (id_seller) REFERENCES users(id)
     );
    `
    );

    console.log('Creando tabla de pedidos');
    await pool.query(
      `CREATE TABLE orders (
        orderId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_buyer VARCHAR(50) NOT NULL,
        id_seller VARCHAR(50) NOT NULL,
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
        id_buyer VARCHAR(50) NOT NULL,
        id_seller VARCHAR(50) NOT NULL,
        id_product INT UNSIGNED NOT NULL,
        orderId INT UNSIGNED NOT NULL,
        valoracion INT UNSIGNED NOT NULL,
        comentaries VARCHAR(200) NOT NULL,
        valoracion_date DATETIME NOT NULL DEFAULT NOW(),
        FOREIGN KEY (id_product) REFERENCES product(product_id),
        FOREIGN KEY (id_buyer) REFERENCES orders(id_buyer),
        FOREIGN KEY (id_seller) REFERENCES orders(id_seller),
        FOREIGN KEY (orderId) REFERENCES orders(orderId)
        );`
    );

    console.log('Creando administradores en la tabla users');
    await pool.query(`
    INSERT INTO users (id, email, username, password, active, role)
    VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'kaysera0@icloud.com', 'kaysera14', '1234aBcD', 1, 'admin'),
          ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4car', 'nadia.garcia.3588@gmail.com', 'nadiag88', '1234aBcD', 1, 'admin'),
          ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4leg', 'tebane@hotmail.com', 'tebane', '1234aBcD', 1, 'admin'),
          ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4top', 'janeiro.bruno23@gmail.com', 'bjaneiro90', '1234aBcD', 1, 'admin');`);

    console.log('Creando productos en la tabla productos');
    await pool.query(`
    INSERT INTO product(product_title, product_image, category, description, price, status, place_of_sale, location, id_seller)
    VALUES('MasterSystem', 'img_1', 'videogame', '1986 Home Video Game Console', '250.00', 'available', 'online', 'Asturias', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'),
          ('Playstation1', 'img_2', 'videogame', '2000 Home Video Game Console', '135.00', 'sold out', 'delivery', 'Canarias', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4car'),
          ('Pentium1', 'img_3', 'pc', '1988 Home Pc', '335.00', 'sold out', 'delivery', 'Cantabria', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4top'),
          ('Macintosh I', 'img_4', 'pc', '1985 Apple Home Pc', '298.00', 'reserved', 'online', 'Balears', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4leg'),
          ('Swiss+go', 'img_5', 'photo/video', '1980 Analogic Photo Camera', '45.00', 'available', 'online', 'Aragón', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'),
          ('Kodak EKtar', 'img_6', 'photo/video', '1992 Analogic Photo Camera', '55.00', 'reserved', 'delivery', 'Madrid', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4car');
`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initDb();
