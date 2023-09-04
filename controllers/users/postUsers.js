const bcrypt = require('bcrypt');
const newUserSchema = require('../../schemas/users/newUser.js');
const insertUser = require('../../db/queries/users/insertUser.js');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { port } = require('../../config.js');
const { v4: uuidv4 } = require('uuid');

// SendGrid Key
sgMail.setApiKey(process.env.SENDGRID_KEY);

const postUsers = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);

    const id = uuidv4();

    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registrationCode = crypto.randomUUID();

    const userId = await insertUser({
      id,
      ...req.body,
      password: hashedPassword,
      registrationCode: registrationCode,
    });

    // Enviar el correo de validación
    const msg = {
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Validar tu cuenta en RetroTech Shop',
      text: `¡Hola ${username}! \n Gracias por registrarte. \n Para completar tu registro, usa el siguiente enlace: http://localhost:${port}/users/validate/${registrationCode};.`,
    };

    await sgMail.send(msg);

    res
      .status(201)
      .send({
        status: 'ok',
        data: { id, email, username, createdAt: new Date() },
      });
  } catch (error) {
    console.error('Error al crear el perfil de usuario:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al crear el perfil de usuario.',
    });
  }
};

module.exports = postUsers;
