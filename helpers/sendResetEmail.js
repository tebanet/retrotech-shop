const sgMail = require('@sendgrid/mail');
const { reset } = require('nodemon');

//FRONTEND
const FRONT =
  'http://' +
  (process.env.FRONT_HOST || 'localhost') +
  ':' +
  (process.env.FRONT_PORT || 5173);
async function sendResetEmail(email, resetToken) {
  try {
    // SendGrid Key
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    const msg = {
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Cambia tu contraseña en RetroTech Shop',
      text: `Hola! \n\nHas solicitado cambiar tu contraseña en RetroTech Shop. Por favor utiliza el siguiente código para recuperar tu contraseña: ${resetToken} \n\nSi lo deseas puedes haz click en el siguiente enlace: ${FRONT}/users/change-password?token=${resetToken}\n\nSi no haz sido tú, por favor haz caso omiso de este correo. \n\n¡Buenas compras!`,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(
      'Error al enviar el correo de recuperación de contraseña:',
      error
    );
    throw error;
  }
}

module.exports = sendResetEmail;
