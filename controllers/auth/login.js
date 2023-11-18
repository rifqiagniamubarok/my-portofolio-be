const Joi = require('joi');
const respond = require('../../utils/respond');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginValidation = Joi.object({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(8).required().label('password'),
});

const login = async (req, res) => {
  const {
    error,
    value: { email, password: password_requested },
  } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  try {
    const user = await User.findOne({ where: { email } });

    const { id, name, password } = user;

    const match = await bcrypt.compare(password_requested, password);

    if (!match) return res.status(400).json(respond(400, 'Email or password wrong', ''));

    const token_payload = {
      id,
      name,
      email,
    };

    const secretKey = process.env.SECRET_KEY || 'rahasia';
    const token = jwt.sign(token_payload, secretKey, { expiresIn: '1d' });

    // res.header('Access-Control-Allow-Credentials', true);
    // res.cookie('token', 'Bearer ' + token, { maxAge: 3600000 });

    return res.status(200).json(respond(200, 'Login successfuly', { email, token }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = login;
