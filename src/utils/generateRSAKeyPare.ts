import fs from "fs";
import crypto from "crypto";
const publicKeyPath = "./publicKey.pem";
const privateKeyPath = "./privateKey.pem";
let publicKey:any;
let privateKey:any;
if (fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath)) {
    console.log('if case');
  publicKey = fs.readFileSync(publicKeyPath);
  privateKey = fs.readFileSync(privateKeyPath);
} else {
        console.log('else case');

  const { publicKey: pub, privateKey: priv } = crypto.generateKeyPairSync(
    "rsa",
    {
      modulusLength: 512,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    }

  );
  publicKey = pub;
  privateKey = priv;
   try {
      fs.writeFileSync(publicKeyPath, publicKey);
      fs.writeFileSync(privateKeyPath, privateKey);
      console.log("File successfully written!");

  } catch (error) {
  console.error("Error occurred:", error);
}
}
