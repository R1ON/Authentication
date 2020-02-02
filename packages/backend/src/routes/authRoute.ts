import express from 'express';
import bcriptjs from 'bcryptjs';

import { check, validationResult } from 'express-validator';

import User from '../models/User';

const Router = express.Router();

// api/auth/registration
Router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 4 символа').isLength({ min: 4 }),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }

      if (User.findOne({ email })) {
        return res.status(400).json({ success: false, message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcriptjs.hash(password, 'auth');
      const user = new User({ email, password: hashedPassword });

      await user.save();

      return res.status(201).json({ success: true, message: 'Пользователь создан' });
    } catch (error) {
      throw res.status(500).json({ success: false, message: error.message });
    }
  },
);

// api/auth/authentication
Router.post('/authentication', async (req: express.Request, res: express.Response) => {
  try {
    console.log('test');
  } catch (error) {
    throw res.status(500).json({ error: true, message: error.message });
  }
});

export default Router;
