const crypto = require('crypto');
const password = process.argv[2] || 'miss2admin2026';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(`Password: ${password}`);
console.log(`SHA-256 Hash: ${hash}`);
