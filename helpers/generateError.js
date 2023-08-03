const fs = require('fs/promises')

const generateError = (msg, statusCode) => {
  const error = new Error(msg);

  error.statusCode = statusCode;

  throw error;
};

const createPathIfNotExists = async (path) => {
  try {
      await fs.access(path)
  } catch {
      await fs.mkdir(path)
  }
}

module.exports = { generateError, createPathIfNotExists }
