import { Router } from 'express';
import feedRoutes from './feed.js';
import moderationRoutes from './moderation.js';
import healthRoutes from './health.js';
import authRoutes from './auth.js';
import notificationRoutes from './notifications.js';
import dmRoutes from './dm.js';
import profileRoutes from './profile.js';

const router = Router();
router.use('/feed', feedRoutes);
router.use('/moderation', moderationRoutes);
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dm', dmRoutes);
router.use('/profile', profileRoutes);
export default router;