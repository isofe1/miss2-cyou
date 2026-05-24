const crypto = require('crypto');
const password = process.argv[2];

if (!password) {
  console.error('Error: Password argument is required.');
  console.error('Usage: node generate_hash.js <password>');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(`Password: ${password}`);
console.log(`SHA-256 Hash: ${hash}`);
