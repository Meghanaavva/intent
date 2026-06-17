import { z } from 'zod';

export const validateSignup = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(72),
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });
  next();
};