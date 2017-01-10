var crypto = require('crypto-js');

var secretMessage = {
  name: 'Roger',
  secretNumber: '17'
};

var secreteKey = 'Federer';

var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage),secreteKey);
console.log("EncryptedMessage- "+ encryptedMessage);

var bytes = crypto.AES.decrypt(encryptedMessage,secreteKey);
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));
console.log("decrypted message- ");
console.log(decryptedMessage);
