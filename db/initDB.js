require('dotenv').config();

const getDB = require('./getDB.js');

const init = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Borrando tablas');
    await connection.query('DROP TABLE IF EXISTS entries');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas');
    console.log('Creando tabla users');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        profile_pic VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        registrationCode VARCHAR(100),
        recoveryPassCode VARCHAR(100),
        active BOOLEAN DEFAULT false,
        createdAt DATETIME NOT NULL DEFAULT NOW(),
        modifiedAt DATETIME
      )
    `);

    console.log('Creando tabla products');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product(
        product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        product_title VARCHAR(50) NOT NULL,
        product_image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2),
        description TEXT NOT NULL,
        place_of_sale VARCHAR(50) NOT NULL,
        userId INT UNSIGNED NOT NULL,
        createdAt DATETIME NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    console.log('Creando administradores en la tabla users');
    await connection.query(`
    INSERT INTO users (email, username, password, active, role)
      VALUES('tebane@gmail.com', 'tebane', '1234abcd!', 1, 'admin'),
            ('kaysera0@icloud.com, 'kaysera14'', '1234abcd!', 1, 'admin'),
            ('nadia.garcia.3588@gmail.com', 'nadiag88', '1234abcd!', 1, 'admin');
            ('janeiro.bruno23@gmail.com', 'bjaneiro90', '1234abcd!', 1, 'admin');
 `);

    console.log('Tablas creadas');
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

init();
