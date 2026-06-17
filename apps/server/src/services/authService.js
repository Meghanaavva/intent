import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ENV } from '../config/env.js';

export function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    ENV.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function signup({ email, password, username }) {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    const field = existing.email === email ? 'Email' : 'Username';
    throw Object.assign(new Error(`${field} already in use`), { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  // Public display name is just the username the person chose at signup —
  // constant for the lifetime of the account, never randomized.
  const user = await User.create({ email, passwordHash, username, anonId: username });
  return { user: toPublic(user) };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error('Invalid email or password'), { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid email or password'), { status: 401 });

  const token = signToken(user);
  return { token, user: toPublic(user) };
}

export async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return toPublic(user);
}

export function toPublic(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    anonId: user.anonId,
  };
}