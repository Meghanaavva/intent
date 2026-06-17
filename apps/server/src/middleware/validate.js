import { z } from 'zod';
export const validatePost = (req, res, next) => {
  const schema = z.object({
    text:     z.string().min(5).max(160),
    vibe:     z.enum(['building','exploring','urgent','casual']).optional(),
    category: z.string().optional(),
    anonId:   z.string().min(3),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });
  next();
};
