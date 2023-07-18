var nodemailer = require("nodemailer");
const sendNotification=async(notification:any,users:any)=>{
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILHOST,
      port: process.env.MAILPORT,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });

    for (const user of users) {
      const mailOptions = {
        from: process.env.MAIL,
        to: user.email,
        subject: "Notification Alert",
        text: notification,
      };
      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent:", result);
    }
    return true;
  } catch (error) {
    return false
  }
}
export default sendNotification;