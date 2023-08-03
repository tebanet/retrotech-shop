const bcrypt = require('bcrypt');
const newUserSchema = require('../../schemas/users/newUser.js');
const insertUser = require('../../db/queries/users/insertUser.js');
const selectUserById = require('../../db/queries/users/selectUserById.js');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { port } = require('../../config.js');

// SendGrid Key
sgMail.setApiKey(process.env.SENDGRID_KEY);

const postUsers = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);

    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registrationCode = crypto.randomUUID();

    const userId = await insertUser({
      ...req.body,
      password: hashedPassword,
      registrationCode: registrationCode,
    });

    const createdUser = await selectUserById(userId);

    // Enviar el correo de validación
    const msg = {
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Validar tu cuenta en RetroTech Shop',
      text: `¡Hola ${username}! \n Gracias por registrarte. \n Para completar tu registro, usa el siguiente enlace: http://localhost:${port}/users/validate/${registrationCode};.`,
    };

    await sgMail.send(msg);

    res.status(201).send({ status: 'ok', data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports = postUsers;
