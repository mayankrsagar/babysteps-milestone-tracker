import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

dotenv.config();

const generateToken = (user) => {
  const payload = { user: { id: user._id } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
    await user.save();

    const token = generateToken(user);
    // strip password before returning
    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);
    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
