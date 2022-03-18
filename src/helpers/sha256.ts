
import crypto from 'crypto';

const _fileHash = (filePath: Buffer): string => {
    let file_buffer = filePath;
    let sum = crypto.createHash('sha256');
    sum.update(file_buffer);
    const hex = sum.digest('hex');

    return hex;
}

export default _fileHash;