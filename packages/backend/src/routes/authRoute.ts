import express from 'express';
import bcriptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { check, validationResult } from 'express-validator';

import User from '../models/User';
import createError from '../constants/createError';

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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return createError(res, 400, 'Некорректные данные при регистрации', errors.array());
      }

      const { email, password } = req.body;

      if (User.findOne({ email })) {
        return createError(res, 400, 'Такой пользователь уже существует');
      }

      const hashedPassword = await bcriptjs.hash(password, 'auth');
      const user = new User({ email, password: hashedPassword });

      await user.save();

      return res.status(201).json({ success: true, message: 'Пользователь создан' });
    } catch (error) {
      throw createError(res, 500, error.message);
    }
  },
);

// api/auth/authentication
Router.post(
  '/authentication',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return createError(res, 400, 'Некорректные данные при входе в систему', errors.array());
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return createError(res, 400, 'Пользователь не найден', errors.array());
      }

      const isMatchPasswords: boolean = await bcriptjs.compare(password, user.password);

      if (!isMatchPasswords) {
        return createError(res, 400, 'Неверный пароль');
      }

      const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return res.json({ token, userId: user.id });
    } catch (error) {
      throw createError(res, 500, error.message);
    }
  },
);

export default Router;
