import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({ windowMs:15*60*1000, max:100, standardHeaders:true, legacyHeaders:false });
export const postLimiter = rateLimit({ windowMs:60*1000, max:5, message:{ error:'Too many posts, slow down.' } });
