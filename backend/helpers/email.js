import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
   const { email, nombre, token } = datos;

   const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "951642eb69b422",
         pass: "c10908bcf33d03"
      }
   });

   // Información del email
   const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en UpTask",
      html: `
         <p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
         <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:  </p>
         <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar cuenta</a>
         <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      `, // html body

   })
};