
import { NextResponse } from 'next/server';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const USER_FILE = './users.json';
const JWT_SECRET = 'your_jwt_secret_key'; // Заменить ключ

const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export async function POST(req) {
  const { email, password } = await req.json();

  let users = [];
  if (fs.existsSync(USER_FILE)) {
    const data = fs.readFileSync(USER_FILE, 'utf-8');
    users = JSON.parse(data);
  }

  if (users.find((user) => user.email === email)) {
    return NextResponse.json({ message: 'Пользователь уже существует' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));

  const token = generateToken(email);
  return NextResponse.json({ token });
}
