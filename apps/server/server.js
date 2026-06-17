import http from 'http';
import app from './src/app.js';
import { initSocket } from './src/socket/index.js';
import { connectDB } from './src/config/db.js';
import { redis } from './src/config/redis.js';
import { ENV } from './src/config/env.js';
import { seedDummyIntents } from './src/utils/seed.js';

const server = http.createServer(app);
initSocket(server);

async function start() {
  await connectDB();
  await redis.connect().catch(() => {});
  await seedDummyIntents().catch(err => console.error('Seed error:', err.message));
  server.listen(ENV.PORT, () => {
    console.log(`🚀 Intent server running on port ${ENV.PORT}`);
  });
}
start();