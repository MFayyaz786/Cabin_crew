import crypto from "crypto";
import fs from "fs";
const publicKeyPath = "./publicKey.pem";
const privateKeyPath = "./privateKey.pem";
const blockSize = 20;
function encryptObject(obj:object) {
    const publicKey = fs.readFileSync(publicKeyPath);
    const data = JSON.stringify(obj);
    let cipher=[];
   if (data.length < blockSize) {
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
        oaepHash: "sha512",
      },
      Buffer.from(data)
      )
    cipher.push(encryptedData);
  }else{
  const stringLength = (data.length / blockSize) + (data.length % blockSize != 0 ? 1 : 0);
  /// encryption
  for (let index = 0; index < stringLength; index++) {

    if (index == data.length / blockSize) {

      const encryptedData = crypto.publicEncrypt(

        {

          key: publicKey,

          padding: crypto.constants.RSA_PKCS1_PADDING,

          oaepHash: "sha512",

        },

        Buffer.from(data));

      cipher.push(encryptedData);

    }

    else {

      const encryptedData = crypto.publicEncrypt(

        {

          key: publicKey,

          padding: crypto.constants.RSA_PKCS1_PADDING,

          oaepHash: "sha512",

        },

        Buffer.from(data.substring((index * blockSize), (index + 1) * blockSize)));

      cipher.push(encryptedData.toString('base64'));

    }

  }


  return { cipher: cipher || "", };

    // const encrypted = crypto.publicEncrypt(
    //   {
    //     key: publicKey,
    //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   },
    //   Buffer.from(plaintext)
    // );
    // Split the plaintext into chunks and encrypt each chunk separately
  //   const chunks = [];
  //   for (let i = 0; i < plaintext.length; i +=chunkSize ) {
  //     const chunk = plaintext.slice(i, i + chunkSize);
  //     const encryptedChunk = crypto.publicEncrypt(
  //       {
  //         key: publicKey,
  //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //         oaepHash:"sha512"
  //       },
  //       Buffer.from(chunk)
  //     );
  //     chunks.push(encryptedChunk);
  //   }

  //   // Combine the encrypted chunks into a single buffer
  //   const encrypted = Buffer.concat(chunks);
  //   return { cipher: encrypted.toString("base64") || "" };
  // } catch (error) {
  //   console.log(error);
  //   return { cipher: "" };
  // }
}
}

function decryptObject(cipher:any) {
  try {
    const privateKey = fs.readFileSync(privateKeyPath);
    const encryptedBuffer = Buffer.from(cipher, "base64");
    console.log("encryptedBuffer: ", encryptedBuffer);
    
    // const decrypted = crypto.privateDecrypt(
    //   {
    //     key: privateKey,
    //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   },
    //   Buffer.from(cipher, "base64")
    // );
      // Split the encrypted data into chunks and decrypt each chunk separately
    const chunks = [];
    for (let i = 0; i < encryptedBuffer.length; i += blockSize) {
      //const chunk = encryptedBuffer.slice(i, i + chunkSize);
      const decryptedChunk = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash:"sha512"
        },
        //chunk
        Buffer.from(cipher[i], 'base64')
        );
        console.log("chunks: ", decryptedChunk);
        chunks.push(decryptedChunk);
      }
      
    // // // Combine the decrypted chunks into a single buffer and convert to a string
     // const decryptedBuffer = Buffer.concat(chunks);
    //const plaintext = decryptedBuffer.toString("utf8");
    try {
      const obj = JSON.parse(chunks.join(''));
      console.log("obj: ", obj);
      return obj;
    } catch (error) {
      return chunks;
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}

 export default { decryptObject, encryptObject };