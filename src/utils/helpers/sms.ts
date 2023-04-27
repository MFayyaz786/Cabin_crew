var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var number = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true,
  logLevel: 'debug',
});

export const sendSms = async (options: { to: string; message: string }) => {
  const { to, message } = options;

  client.messages
    .create({
      to: to,
      from: number,
      body: message,
    })
    .then((message: any) => console.log(`Sms sent`))
    .catch((error: any) => console.error(error));
};
