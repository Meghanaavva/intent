import { Router } from 'express';
import { signup, login, getUserById } from '../services/authService.js';
import { validateSignup, validateLogin } from '../middleware/validateAuth.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', validateSignup, async (req, res, next) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (err) { next(err); }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) { next(err); }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    res.json({ user });
  } catch (err) { next(err); }
});

export default router;
