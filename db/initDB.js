require('dotenv').config();
const bcrypt = require('bcrypt');

const getDB = require('./getDB.js');
const { v4: uuidv4 } = require('uuid');

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
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        profile_pic VARCHAR(255),
        bio VARCHAR(255),
        address VARCHAR(100),
        role ENUM('admin', 'user') DEFAULT 'user',
        registrationCode VARCHAR(100),
        recoveryToken VARCHAR(100),
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
     category ENUM('videogame', 'pc', 'accessories', 'photography') NOT NULL,
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
        order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_buyer VARCHAR(50) NOT NULL,
        id_seller VARCHAR(50) NOT NULL,
        id_product INT UNSIGNED NOT NULL,
        order_status ENUM('accepted', 'rejected', 'pending') NOT NULL DEFAULT 'pending',
        order_date DATETIME NOT NULL DEFAULT NOW(),
        message VARCHAR(100),
        delivery_status ENUM('delivered', 'bounced', 'delayed'),
        delivery_date DATETIME,
        delivery_place VARCHAR(50),
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
        order_id INT UNSIGNED NOT NULL,
        valoracion INT UNSIGNED NOT NULL,
        comentaries VARCHAR(200) NOT NULL,
        valoracion_date DATETIME NOT NULL DEFAULT NOW(),
        FOREIGN KEY (id_product) REFERENCES product(product_id),
        FOREIGN KEY (id_buyer) REFERENCES orders(id_buyer),
        FOREIGN KEY (id_seller) REFERENCES orders(id_seller),
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
        );`
    );

    const defaultPassword = 'Pass1234';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    console.log(hashedPassword);

    console.log('Creando administradores en la tabla users');
    await pool.query(`
      INSERT INTO users (id, email, username, password, active, role, profile_pic)
      VALUES
        ('7e6b4ea2-4be6-4a0f-85a6-95d3dfaa0c7f', 'kaysera0@icloud.com', 'kaysera14', '${hashedPassword}', 1, 'admin', 'https://i.pravatar.cc/150?img=14'),
        ('acac4b95-9a74-4b0b-afe2-6f6e39d1c318', 'tebane@hotmail.com', 'tebanetcheverry', '${hashedPassword}', 1, 'admin', 'https://i.pravatar.cc/150?img=3'),
        ('b8c44bf6-d301-4d28-b674-8eb1269a3f2b', 'janeiro.bruno23@gmail.com', 'bjaneiro90', '${hashedPassword}', 1, 'admin', 'https://i.pravatar.cc/150?img=12');
    `);

    console.log('Creando usuarios en la tabla users');
    await pool.query(`
    INSERT INTO users (id, username, email, password, profile_pic, bio, address, role, active, createdAt, modifiedAt)
    VALUES ('12f94aa6-e220-3fca-9ce9-77127eb425db', 'uguillen', 'millán.pau@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Est aut quae debitis.', 'Chavarría Baja', 'user', 1, '1983-10-23 05:20:41', '2023-02-23 01:00:58'),
    ('219cfd0e-3548-3d05-8403-cc462f5a0760', 'regalado.andres', 'mohamed.sisneros@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Ut ea voluptatibus fugit rerum.', 'Las Cabello', 'user', 1, '1993-05-03 09:20:54', '2021-02-12 12:14:02'),
    ('25f08907-6dde-370a-88ed-0fdb1d5ce314', 'marti38', 'kaparicio@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Ut rerum facere accusantium facilis et nisi sed nemo.', 'Villa Oquendo', 'user', 1, '1990-11-26 08:54:30', '1981-09-24 17:38:37'),
    ('27cc2c2d-2046-3231-9b8b-5055b97d7c66', 'pol97', 'marc.gonzales@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Iusto sint illo modi saepe.', 'El Vega', 'user', 1, '2020-02-21 20:37:35', '1998-01-21 17:44:33'),
    ('30b21b1f-f87c-33cd-9dd0-b359ecdee060', 'javier.tejeda', 'isaac26@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Sed dignissimos qui laboriosam nobis illum ut.', 'Córdoba de Ulla', 'user', 1, '2008-04-05 13:23:44', '2020-12-05 22:37:22'),
    ('43630272-4245-3329-b431-d7aeb459ab64', 'mascareñas.ana', 'barreto.pau@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Doloremque eos officiis sit hic atque voluptatem.', 'La Blasco del Puerto', 'user', 1, '2000-11-24 08:36:34', '2006-04-23 12:39:59'),
    ('45193209-8e3b-302d-aa41-18832da0f98f', 'joel.caraballo', 'marta.sarabia@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Occaecati repellendus neque deserunt minus id expedita velit.', 'Feliciano Medio', 'user', 1, '2011-10-21 13:40:06', '1995-12-04 12:08:20'),
    ('5006caef-04d0-3de3-9c21-a13c85b3bda3', 'wabad', 'jordi.lovato@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Voluptatibus in ad sit nisi labore at.', 'Carrero del Barco', 'user', 1, '1975-03-01 14:10:41', '2018-11-07 12:53:48'),
    ('5183907f-12ad-3b99-9bc1-1fef1e47b2a2', 'perea.raul', 'araña.alba@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Et ullam tempora soluta illo molestiae quia.', 'La Antón', 'user', 1, '1994-11-12 01:10:12', '1989-10-12 12:58:58'),
    ('5ad54322-4c07-30f6-9f05-c0e060c7f160', 'noelia24', 'uamador@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Eos voluptatem quia et vitae magni.', 'Pabón del Mirador', 'user', 1, '2020-04-17 06:29:46', '1978-10-09 13:47:39'),
    ('822eec5b-faf6-3e3c-afde-a28d3b721185', 'ariadna.espinal', 'raul54@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Sapiente dolore ea expedita maxime ipsum.', 'Garica del Bages', 'user', 1, '1973-11-12 13:38:46', '1993-12-09 18:58:48'),
    ('82f7ca2f-4112-30a3-a617-e33903d5e65e', 'saldaña.sara', 'sara59@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Molestiae quasi tempore atque nesciunt.', 'Arenas de San Pedro', 'user', 1, '2019-08-06 05:11:04', '2005-05-04 16:38:11'),
    ('86b691a8-3512-3317-98a7-457e9178bb19', 'hsaldaña', 'tacosta@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Qui quos est hic.', 'Os Cabán Alta', 'user', 1, '1972-11-02 01:51:29', '2021-10-07 21:01:52'),
    ('9044348e-1649-3894-b11c-3f823fba35ef', 'patricia.echevarría', 'laia.calero@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Optio pariatur eos atque.', 'Cano', 'user', 1, '2006-05-05 23:20:14', '2010-11-30 10:59:19'),
    ('9eba626a-d35e-36ce-956c-495c5e5c1caa', 'rosas.nerea', 'rico.maria@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'A assumenda delectus est debitis consequuntur id ea.', 'Caro de Lemos', 'user', 1, '1991-03-21 17:44:01', '1972-12-14 09:33:47'),
    ('a38b2f6a-4e4d-336b-be30-087b824cc388', 'guillem46', 'izambrano@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Praesentium qui eum nemo.', 'Quiroz de Ulla', 'user', 1, '2004-10-13 14:38:31', '1972-11-22 10:32:32'),
    ('a7a59c42-4311-3364-868d-232eef544322', 'hdomingo', 'rayan.oliva@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Repellat quia sint voluptas autem consequatur cupiditate id et.', 'La Delapaz', 'user', 1, '2001-03-31 07:11:38', '1973-03-27 20:22:00'),
    ('b2235cbf-9b37-3b1d-88e4-3e0e2c8653da', 'lugo.nadia', 'iker.delarosa@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Ea sint eum ipsa minima.', 'Villa Zamora', 'user', 1, '2011-08-31 10:09:37', '2017-11-21 20:34:23'),
    ('c4b6a0d0-b83f-3e3e-b8cc-14e56ec73126', 'olmos.mohamed', 'garibay.paola@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Non maxime et voluptates incidunt placeat ipsam unde.', 'Os Bravo', 'user', 1, '2003-09-08 18:41:04', '1994-09-24 22:55:51'),
    ('c88018ab-2650-3c37-84ef-8c6bb4f89d12', 'mohamed.córdova', 'miriam.terrazas@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Ea est velit facere quos vel voluptas quod.', 'Vall Polanco', 'user', 1, '1989-12-22 04:48:24', '2009-08-28 20:24:53'),
    ('d6d1e655-c06a-3841-bf30-bd05d3440866', 'hnavarro', 'paola80@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Praesentium ut dolor non numquam quae voluptatem.', 'El Simón', 'user', 1, '1988-12-03 10:25:52', '1982-11-07 13:10:51'),
    ('d8beb91c-092a-307b-9601-69eb7a82de57', 'xcedillo', 'ian.apodaca@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Deleniti molestias nemo voluptas rerum labore et nisi ea.', 'Las Vera', 'user', 1, '1979-06-25 12:43:14', '1991-02-28 18:45:57'),
    ('db1b92de-6c90-36a3-9eb8-48cb9879d868', 'jroque', 'naia22@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Atque ex nihil aperiam libero.', 'Lebrón de la Sierra', 'user', 1, '2005-07-02 21:41:59', '1995-09-06 05:38:08'),
    ('e109669d-ee08-3273-8882-1047ffbc4d29', 'anna.arroyo', 'pedraza.adria@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Est eum quam et unde.', 'As Padrón del Vallès', 'user', 1, '1985-07-03 07:29:06', '2009-09-22 16:35:00'),
    ('e237a1cb-4f9b-3c2b-b189-ff2eac470f22', 'meza.abril', 'collado.daniela@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Quibusdam aut qui enim quis.', 'Vall Granados del Pozo', 'user', 1, '1999-02-09 18:40:48', '2011-06-03 09:39:13'),
    ('e589b975-ef02-3460-8735-8f6c6866eef7', 'rafael22', 'isaac.jasso@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Mollitia laborum distinctio sit officiis recusandae hic.', 'Zepeda de las Torres', 'user', 1, '2007-10-07 21:38:53', '1982-08-08 17:59:11'),
    ('e8282f69-2577-39b2-967c-a1d707af73b5', 'alma.saldivar', 'franciscojavier57@example.com', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Quia suscipit dignissimos aperiam placeat ratione eius.', 'As Quezada', 'user', 1, '1998-04-12 09:21:33', '2018-03-05 23:51:08'),
    ('f3d78f77-a2fc-3fca-9f3e-711d77429a7c', 'zcardenas', 'font.josemanuel@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Eligendi molestias sapiente ut quis et pariatur sit.', 'Vall Montero', 'user', 1, '2018-07-09 16:31:18', '1972-08-16 10:58:52'),
    ('f46648ba-a3c0-304e-b4e1-74b38afe43b1', 'dnavarro', 'ozamudio@example.net', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Officia amet velit non.', 'Madera de las Torres', 'user', 1, '2022-12-25 05:18:58', '2011-01-09 11:47:27'),
    ('f6dccfe7-fbcd-345c-a716-bd12adc43c4e', 'zalemán', 'oruvalcaba@example.org', '${hashedPassword}', 'https://loremflickr.com/200/200/people/', 'Deserunt dignissimos fuga quo incidunt officiis aperiam tempore.', 'Las Partida de Arriba', 'user', 1, '1986-03-15 15:09:45', '2001-06-19 00:56:36');
    `);

    console.log('Creando productos en la tabla productos');
    await pool.query(`
    INSERT INTO product(product_title, product_image, category, description, price, status, place_of_sale, location, id_seller)
VALUES
('Commodore 64', 'sample_pics/Commodore64.jpg', 'videogame', 'El legendario Commodore 64 de los años 80.', 199.99, 'available', 'online', 'Andalucía', '30b21b1f-f87c-33cd-9dd0-b359ecdee060'),
('Atari 2600', 'sample_pics/Atari2600.webp', 'videogame', 'La icónica consola Atari 2600 de los años 70.', 149.99, 'available', 'online', 'Catalunya', 'a38b2f6a-4e4d-336b-be30-087b824cc388'),
('Walkman Sony', 'sample_pics/WalkmanSony.webp', 'accessories', 'El clásico Walkman de Sony de los años 80.', 49.99, 'sold out', 'delivery', 'Comunitat Valenciana', '86b691a8-3512-3317-98a7-457e9178bb19'),
('Compaq Presario', 'sample_pics/CompaqPresario.jpg', 'pc', 'El computador Compaq Presario de los años 90.', 599.99, 'available', 'online', 'Madrid', 'b2235cbf-9b37-3b1d-88e4-3e0e2c8653da'),
('Polaroid SX-70', 'sample_pics/PolaroidSX70.webp', 'photography', 'La cámara Polaroid SX-70 de los años 70.', 129.99, 'reserved', 'online', 'Balears', 'd6d1e655-c06a-3841-bf30-bd05d3440866'),
('Nintendo Entertainment System', 'sample_pics/NintendoEntertainmentSystem.webp', 'videogame', 'La consola NES de Nintendo de los años 80.', 179.99, 'available', 'online', 'Galicia', 'e109669d-ee08-3273-8882-1047ffbc4d29'),
('Sony Trinitron TV', 'sample_pics/SonyTrinitronTv.jpg', 'accessories', 'El televisor Sony Trinitron de los años 90.', 249.99, 'available', 'online', 'Aragón', 'f6dccfe7-fbcd-345c-a716-bd12adc43c4e'),
('Apple Macintosh', 'sample_pics/AppleMacintosh.jpg', 'pc', 'El revolucionario Apple Macintosh de los años 80.', 299.99, 'sold out', 'delivery', 'Cantabria', 'b8c44bf6-d301-4d28-b674-8eb1269a3f2b'),
('VHS Player', 'sample_pics/VHS Player.webp', 'accessories', 'El reproductor de cintas VHS de los años 80.', 79.99, 'available', 'online', 'Extremadura', '27cc2c2d-2046-3231-9b8b-5055b97d7c66'),
('Atari ST', 'sample_pics/AtariST.jpg', 'pc', 'El computador Atari ST de los años 80.', 349.99, 'available', 'online', 'Rioja', 'f3d78f77-a2fc-3fca-9f3e-711d77429a7c'),
('Game Boy', 'sample_pics/GameBoy.jpg', 'videogame', 'La clásica Game Boy de Nintendo de los años 90.', 79.99, 'available', 'online', 'Murcia', 'e237a1cb-4f9b-3c2b-b189-ff2eac470f22'),
('Pentax K1000', 'sample_pics/PentaxK1000.webp', 'photography', 'La cámara Pentax K1000 de los años 70.', 149.99, 'sold out', 'delivery', 'Navarra', 'acac4b95-9a74-4b0b-afe2-6f6e39d1c318'),
('Sega Genesis', 'sample_pics/SegaGenesis.jpg', 'videogame', 'La consola Sega Genesis de los años 90.', 129.99, 'reserved', 'online', 'País Vasco', '5006caef-04d0-3de3-9c21-a13c85b3bda3'),
('Motorola DynaTAC', 'sample_pics/MotorolaDynaTAC.webp', 'accessories', 'El teléfono móvil Motorola DynaTAC de los años 80.', 199.99, 'available', 'online', 'Ceuta', '82f7ca2f-4112-30a3-a617-e33903d5e65e'),
('Commodore Amiga', 'sample_pics/CommodoreAmiga.jpg', 'pc', 'El computador Commodore Amiga de los años 80.', 399.99, 'available', 'online', 'Melilla', 'd8beb91c-092a-307b-9601-69eb7a82de57'),
('Sega Game Gear', 'sample_pics/SegaGameGear.jpg', 'videogame', 'La consola Sega Game Gear de los años 90.', 99.99, 'available', 'online', 'Andalucía', '9044348e-1649-3894-b11c-3f823fba35ef'),
('Sony Walkman CD', 'sample_pics/SonyWalkmanCD.jpg', 'accessories', 'El Walkman CD de Sony de los años 90.', 79.99, 'sold out', 'delivery', 'Galicia', '7e6b4ea2-4be6-4a0f-85a6-95d3dfaa0c7f'),
('Commodore VIC-20', 'sample_pics/CommodoreVIC-20.jpg', 'pc', 'El computador Commodore VIC-20 de los años 80.', 149.99, 'available', 'online', 'Comunitat Valenciana', '25f08907-6dde-370a-88ed-0fdb1d5ce314'),
('Nikon F3', 'sample_pics/NikonF3.jpeg', 'photography', 'La cámara Nikon F3 de los años 80.', 199.99, 'available', 'online', 'Balears', 'e8282f69-2577-39b2-967c-a1d707af73b5'),
('Super Nintendo', 'sample_pics/SuperNintendo.jpg', 'videogame', 'La consola Super Nintendo de los años 90.', 179.99, 'available', 'online', 'Catalunya', 'b2235cbf-9b37-3b1d-88e4-3e0e2c8653da'),
('Sony Handycam', 'sample_pics/SonyHandycam.jpg', 'photography', 'La cámara Sony Handycam de los años 90.', 149.99, 'sold out', 'delivery', 'Comunitat Valenciana', '5183907f-12ad-3b99-9bc1-1fef1e47b2a2'),
('Atari 5200', 'sample_pics/Atari5200.jpg', 'videogame', 'La consola Atari 5200 de los años 80.', 199.99, 'available', 'online', 'Madrid', 'b2235cbf-9b37-3b1d-88e4-3e0e2c8653da'),
('Sony Vaio', 'sample_pics/SonyVaio.jpg', 'pc', 'El computador Sony Vaio de los años 90.', 499.99, 'available', 'online', 'Balears', 'f3d78f77-a2fc-3fca-9f3e-711d77429a7c'),
('Game Boy Color', 'sample_pics/GameBoyColor.jpg', 'videogame', 'La Game Boy Color de Nintendo de los años 90.', 69.99, 'available', 'online', 'Galicia', 'e237a1cb-4f9b-3c2b-b189-ff2eac470f22'),
('Sega CD', 'sample_pics/SegaCD.png', 'videogame', 'La consola Sega CD de los años 90.', 179.99, 'available', 'online', 'Cantabria', 'a38b2f6a-4e4d-336b-be30-087b824cc388'),
('Apple PowerBook', 'sample_pics/ApplePowerBook.jpg', 'pc', 'El Apple PowerBook de los años 90.', 699.99, 'reserved', 'online', 'Extremadura', '86b691a8-3512-3317-98a7-457e9178bb19'),
('Polaroid OneStep', 'sample_pics/PolaroidOneStep.webp', 'photography', 'La cámara Polaroid OneStep de los años 70.', 99.99, 'available', 'online', 'Rioja', 'd6d1e655-c06a-3841-bf30-bd05d3440866'),
('Sega Master System', 'sample_pics/SegaMasterSystem.jpg', 'videogame', 'La consola Sega Master System de los años 80.', 129.99, 'available', 'online', 'Murcia', 'a7a59c42-4311-3364-868d-232eef544322'),
('Sony PSP', 'sample_pics/SonyPSP.webp', 'videogame', 'La consola Sony PSP de los años 2000.', 149.99, 'sold out', 'delivery', 'Navarra', 'e589b975-ef02-3460-8735-8f6c6866eef7'),
('Apple Macintosh SE', 'sample_pics/AppleMacintoshSE.webp', 'pc', 'El Apple Macintosh SE de los años 80.', 399.99, 'available', 'online', 'País Vasco', 'f46648ba-a3c0-304e-b4e1-74b38afe43b1'),
('Kodak Instamatic', 'sample_pics/KodakInstamatic.jpg', 'photography', 'La cámara Kodak Instamatic de los años 60.', 69.99, 'available', 'online', 'Ceuta', 'd8beb91c-092a-307b-9601-69eb7a82de57'),
('Atari Lynx', 'sample_pics/AtariLynx.jpg', 'videogame', 'La consola Atari Lynx de los años 90.', 99.99, 'available', 'online', 'Melilla', 'e8282f69-2577-39b2-967c-a1d707af73b5'),
('Sony Clie', 'sample_pics/SonyClie.jpg', 'accessories', 'La PDA Sony Clie de los años 90.', 49.99, 'sold out', 'delivery', 'Andalucía', 'f3d78f77-a2fc-3fca-9f3e-711d77429a7c'),
('Commodore 128', 'sample_pics/Commodore128.jpg', 'pc', 'El computador Commodore 128 de los años 80.', 249.99, 'available', 'online', 'Catalunya', '30b21b1f-f87c-33cd-9dd0-b359ecdee060'),
('Nikon FM2', 'sample_pics/NikonFM2.jpg', 'photography', 'La cámara Nikon FM2 de los años 80.', 179.99, 'reserved', 'online', 'Comunitat Valenciana', '5183907f-12ad-3b99-9bc1-1fef1e47b2a2'),
('Sega Dreamcast', 'sample_pics/SegaDreamcast.jpg', 'videogame', 'La consola Sega Dreamcast de los años 90.', 199.99, 'available', 'online', 'Madrid', 'b8c44bf6-d301-4d28-b674-8eb1269a3f2b'),
('Sony Watchman', 'sample_pics/SonyWatchman.jpg', 'accessories', 'El Sony Watchman de los años 80.', 79.99, 'available', 'online', 'Balears', '25f08907-6dde-370a-88ed-0fdb1d5ce314'),
('Apple IIGS', 'sample_pics/AppleIIGS.jpg', 'pc', 'El computador Apple IIGS de los años 80.', 299.99, 'sold out', 'delivery', 'Catalunya', 'e8282f69-2577-39b2-967c-a1d707af73b5'),
('Game Boy Advance', 'sample_pics/GameBoyAdvance.jpg', 'videogame', 'La Game Boy Advance de Nintendo de los años 2000.', 69.99, 'available', 'online', 'Comunitat Valenciana', 'a7a59c42-4311-3364-868d-232eef544322'),
('Sony Mavica', 'sample_pics/SonyMavica.jpeg', 'photography', 'La cámara Sony Mavica de los años 90.', 99.99, 'available', 'online', 'Madrid', 'b2235cbf-9b37-3b1d-88e4-3e0e2c8653da'),
('Commodore Amstrad CPC', 'sample_pics/CommodoreAmstradCPC.jpg', 'pc', 'El computador Commodore Amstrad CPC de los años 80.', 199.99, 'available', 'online', 'Cantabria', '30b21b1f-f87c-33cd-9dd0-b359ecdee060'),
('Polaroid Spectra', 'sample_pics/PolaroidSpectra.png', 'photography', 'La cámara Polaroid Spectra de los años 90.', 129.99, 'reserved', 'online', 'Extremadura', 'd6d1e655-c06a-3841-bf30-bd05d3440866'),
('Nintendo GameCube', 'sample_pics/NintendoGameCube.jpg', 'videogame', 'La consola Nintendo GameCube de los años 2000.', 179.99, 'available', 'online', 'Rioja', 'acac4b95-9a74-4b0b-afe2-6f6e39d1c318'),
('Sony NetMD', 'sample_pics/SonyNetMD.webp', 'accessories', 'El reproductor Sony NetMD de los años 90.', 79.99, 'sold out', 'delivery', 'Murcia', '5006caef-04d0-3de3-9c21-a13c85b3bda3'),
('IBM PCjr', 'sample_pics/IBMPCjr.jpg', 'pc', 'El computador IBM PCjr de los años 80.', 299.99, 'available', 'online', 'Navarra', 'f46648ba-a3c0-304e-b4e1-74b38afe43b1'),
('Sony Handycam DVD', 'sample_pics/SonyHandycamDVD.jpg', 'photography', 'La cámara Sony Handycam DVD de los años 2000.', 199.99, 'available', 'online', 'País Vasco', 'b8c44bf6-d301-4d28-b674-8eb1269a3f2b'),
('Sega Game Boy Advance', 'sample_pics/SegaGameBoyAdvance.jpg', 'videogame', 'La consola Sega Game Boy Advance de los años 2000.', 149.99, 'sold out', 'delivery', 'Ceuta', 'e589b975-ef02-3460-8735-8f6c6866eef7'),
('Commodore PET', 'sample_pics/CommodorePET.jpg', 'pc', 'El computador Commodore PET de los años 70.', 349.99, 'available', 'online', 'Melilla', '82f7ca2f-4112-30a3-a617-e33903d5e65e'),
('Nintendo Super Nintendo Entertainment System', 'sample_pics/NintendoSuperNintendoEntertainmentSystem.webp', 'videogame', 'La Super Nintendo Entertainment System (SNES) de los años 90.', 179.99, 'available', 'online', 'Andalucía', '7e6b4ea2-4be6-4a0f-85a6-95d3dfaa0c7f'),
('Sony MiniDisc Player', 'sample_pics/SonyMiniDiscPlayer.jpg', 'accessories', 'El reproductor MiniDisc de Sony de los años 90.', 89.99, 'sold out', 'delivery', 'Galicia', 'acac4b95-9a74-4b0b-afe2-6f6e39d1c318'),
('IBM PS/2', 'sample_pics/IBMPS-2.jpg', 'pc', 'El IBM PS/2 de los años 80.', 499.99, 'available', 'online', 'Comunitat Valenciana', '5183907f-12ad-3b99-9bc1-1fef1e47b2a2'),
('Nintendo Game Boy Color', 'sample_pics/NintendoGameBoyColor.jpg', 'videogame', 'La Game Boy Color de Nintendo de los años 90.', 69.99, 'available', 'online', 'Aragón', 'd6d1e655-c06a-3841-bf30-bd05d3440866'),
('Sony Discman D-50', 'sample_pics/SonyDiscmanD-50.jpg', 'accessories', 'El Sony Discman D-50 de los años 90.', 59.99, 'reserved', 'online', 'Cantabria', 'b8c44bf6-d301-4d28-b674-8eb1269a3f2b'),
('Apple Macintosh Plus', 'sample_pics/AppleMacintoshPlus.jpg', 'pc', 'El Apple Macintosh Plus de los años 80.', 499.99, 'available', 'online', 'Navarra', '30b21b1f-f87c-33cd-9dd0-b359ecdee060'),
('Sony Trinitron Color TV', 'sample_pics/SonyTrinitronColorTV.webp', 'accessories', 'El televisor Sony Trinitron Color de los años 90.', 349.99, 'sold out', 'delivery', 'País Vasco', 'f3d78f77-a2fc-3fca-9f3e-711d77429a7c'),
('VHS Camcorder', 'sample_pics/VHSCamcorder.jpg', 'photography', 'La videocámara VHS de los años 90.', 199.99, 'available', 'online', 'Ceuta', '82f7ca2f-4112-30a3-a617-e33903d5e65e'),
('Sega Saturn', 'sample_pics/SegaSaturn.jpg', 'videogame', 'La consola Sega Saturn de los años 90.', 179.99, 'available', 'online', 'Melilla', 'd8beb91c-092a-307b-9601-69eb7a82de57');
`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initDb();
