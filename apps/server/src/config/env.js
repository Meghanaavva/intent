import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
export const ENV = {
  PORT:            process.env.PORT || 4000,
  NODE_ENV:        process.env.NODE_ENV || 'development',
  CLIENT_URL:      process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI:     process.env.MONGODB_URI || '',
  REDIS_URL:       process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET:      process.env.JWT_SECRET || 'dev_secret_change_in_prod',
  OPENAI_API_KEY:  process.env.OPENAI_API_KEY || '',
};

// Warn if critical vars are missing
if (!ENV.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not set — database will not connect');
}