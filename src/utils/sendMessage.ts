import axios from 'axios';

const sendMessage = async (to: string, body: string): Promise<any> => {
  try {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        body,
      },
    });

    const config = {
      method: 'post',
      url: `https://graph.facebook.com/v15.0/${process.env.NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BOT_TOKEN}`,
      },
      data: data,
    };

    return await axios(config);
  } catch (error: any) {
    console.log({ msg: error.message });
    return null;
  }
};

export default sendMessage;
