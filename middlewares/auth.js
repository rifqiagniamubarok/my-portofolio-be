const jwt = require('jsonwebtoken');
const respond = require('../utils/respond');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) return res.status(401).json(respond(401, 'you have no access', ''));

  getToken = authHeader.split(' ');
  token = getToken[1];
  const secretKey = process.env.SECRET_KEY || 'rahasia';

  if (!token) return res.status(401).json(respond(401, 'you have no access', ''));

  try {
    const decode = await jwt.verify(token, secretKey);
    const { id, name, email } = decode;
    req.token = { id, name, email };
    next();
  } catch (error) {
    return res.status(401).json(respond(401, 'You have no access here', ''));
  }
};

module.exports = auth;
