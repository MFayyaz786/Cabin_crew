import axios from "axios";


console.log('process.env.SMSUserName :>> ', process.env.SMSUserName);
console.log('process.env.SMSPassword :>> ', process.env.SMSPassword);
console.log('process.env.SMSURL :>> ', process.env.SMSURL);

const smsServices = {
  sendSMS: async (Message: string, PhoneNumber: string) => {
    const Request = {
      UserName: process.env.SMSUserName,
      Password: process.env.SMSPassword,
      Message,
      PhoneNumber,
      RequestedDateTime:new Date().toLocaleString(),
    };
console.log(Request);

    const res = await axios.post(process.env.SMSURL || '', Request);
    return res;
  },
};

export default smsServices;
