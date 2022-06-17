const crypto = require('crypto');

const initVector = crypto.randomBytes(16);
const SecurityKey = crypto.randomBytes(32);

function encrypte(password) {
    const cipher = crypto.createCipheriv('aes-256-cbc', SecurityKey, initVector);
    let encryptedData = cipher.update(password, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
}

function decrypte(password) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', SecurityKey, initVector);
    let decryptedData = decipher.update(password, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}
 
module.exports = {encrypte, decrypte};