function generateDeleteKey() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateDeleteKey };
}
