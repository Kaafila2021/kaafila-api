// import ipfs, { IPFS } from 'ipfs';
// import path from 'path';
// import fs from 'fs';
// import crypto from 'crypto';
// import { FileAdded } from '../routes/upload/handlers/models/UploadResponse.model';

// const ALGORITHM = 'aes-256-cbc';
// const IV_LENGTH = 16; // For AES, this is always 16

// export default class IPFSWrapper {

//   encryptionPassword: string;
//   node: IPFS;

//   constructor(encryptionPassword = undefined) {
//     if (encryptionPassword) {
//       this.encryptionPassword = crypto.createHash('sha256').update(String(encryptionPassword)).digest('base64').substr(0, 32)
//     }
//   }

//   async init() {
//     this.node = await ipfs.create()
//     const version = await this.node.version()
//     // console.log('IPFS node:', this.node)
//     console.log('IPFS version:', version.version)
//   }

//   async uploadFile(filepath): Promise<{ fileAdded: FileAdded, fileHash: string }> {
//     let fileContents = fs.readFileSync(filepath);
//     const fileHash = this._fileHash(fileContents);

//     if (Boolean(this.encryptionPassword)) {
//       console.log('Encrypting file')
//       fileContents = this._encryptBuffer(fileContents)
//     }

//     const fileAdded = await this.node.add({
//       path: path.basename(filepath),
//       content: fileContents
//     })

//     return { fileAdded, fileHash };
//   }

//   async downloadFile({ cid, filename, extension }): Promise<String> {
//     console.log('Looking for contents of hash:', cid)

//     const chunks = []
//     for await (const chunk of this.node.cat(cid)) {
//       chunks.push(chunk)
//     }
//     let fileContents = Buffer.concat(chunks)

//     if (Boolean(this.encryptionPassword)) {
//       console.log('Unencrypting file =>', fileContents)
//       fileContents = this._decryptBuffer(fileContents)
//     }

//     const dir = 'downloads/';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     console.log('File contents retrieved with buffer length:', fileContents.length);
//     fs.writeFileSync(`${dir}/${filename}.${extension}`, fileContents);

//     return `${filename}`;
//   }

//   _encryptBuffer(buffer) {
//     console.log('Running encryption on file before uploading')
//     let iv = crypto.randomBytes(IV_LENGTH)
//     let cipher = crypto.createCipheriv(ALGORITHM, this.encryptionPassword, iv)
//     let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()])
//     return Buffer.from(iv.toString('hex') + ':' + encrypted.toString('hex'))
//   }

//   _decryptBuffer(buffer) {
//     console.log('Running decryption on downloaded file')
//     let textParts = String(buffer).split(':')
//     let iv = Buffer.from(textParts.shift(), 'hex')
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex')
//     let decipher = crypto.createDecipheriv(ALGORITHM, this.encryptionPassword, iv)
//     let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])
//     return decrypted
//   }

//   _fileHash = filePath => {
//     let file_buffer = filePath;
//     let sum = crypto.createHash('sha256');
//     sum.update(file_buffer);
//     const hex = sum.digest('hex');

//     return hex;
//   }



// }
