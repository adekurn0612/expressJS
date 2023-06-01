import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/init-models.js';
import users from '../models/users.js';

const checkUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await models.users.findOne({ where: { user_name: user_name } });
    if (user == null) {
      throw new Error('Invalid username');
    }
    const password1 = await bcrypt.compare(password, user.password);
    if (!password1) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ user_name: user_name }, 'secret_key', { expiresIn: '23H' });
    res.json({ message: `Welcome ${user_name}`, token: token });
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};

const checkToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, 'secret_key');
      next();
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  };
  

export default { checkUser,
checkToken };
