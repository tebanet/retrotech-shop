const bcrypt = require('bcrypt');
const newUserSchema = require('../../schemas/users/newUser.js');
const insertUser = require('../../db/queries/users/insertUser.js');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { v4: uuidv4 } = require('uuid');

// SendGrid Key
sgMail.setApiKey(process.env.SENDGRID_KEY);

//HOST
const HOST =
  'http://' +
  (process.env.HOST || 'localhost') +
  ':' +
  (process.env.PORT || 3000);

const postUsers = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);

    const id = uuidv4();

    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registrationCode = crypto.randomUUID();

    const defaultUserPic = `${HOST}/profile_pics/default_profile_pic.webp`;

    const userId = await insertUser({
      id,
      ...req.body,
      password: hashedPassword,
      registrationCode: registrationCode,
      profile_pic: defaultUserPic,
    });

    // Enviar el correo de validación
    const msg = {
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Validar tu cuenta en RetroTech Shop',
      text: `¡Hola ${username}! \n\nGracias por registrarte. \n\nPara completar tu registro, usa el siguiente código: ${registrationCode} \n\n¡Buenas compras!`,
    };

    await sgMail.send(msg);

    res.status(201).send({
      status: 'ok',
      data: { id, email, username, createdAt: new Date() },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = postUsers;
