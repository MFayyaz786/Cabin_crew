// import sgMail = require('@sendgrid/mail');

// interface sendMailOptions {
//   email: string;
//   subject: string;
//   html?: string;
//   user?: string;
//   url?: string;
// }

// export const sendMail = async (options: sendMailOptions) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
//   console.log(
//     'process.env.SENDGRID_API_KEY',
//     process.env.SENDGRID_API_KEY as string
//   );

//   const msg = {
//     from: process.env.EMAIL_FROM as string,
//     to: options.email,
//     subject: options.subject,
//     // text: htmlToText.fromString(html),
//     html:
//       options.html ||
//       // email text for sending account activation email after signup
//       `<h1>Hi ${options.user},</h1>
//     <p>Thank you for registering with us.</p>
//     <p>Please click on the following link to activate your account:</p>
//     <a href="${options.url}">${options.url}</a>
//     <p>If you did not request this, please ignore this email.</p>`,
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent');
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
