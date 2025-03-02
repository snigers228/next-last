
import { NextResponse } from 'next/server';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const USER_FILE = './users.json';
const JWT_SECRET = 'your_jwt_secret_key';

const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export async function POST(req) {
  const { email, password } = await req.json();

  if (fs.existsSync(USER_FILE)) {
    const data = fs.readFileSync(USER_FILE, 'utf-8');
    const users = JSON.parse(data);
    const user = users.find((user) => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Неверные данные' }, { status: 401 });
    }

    const token = generateToken(email);
    return NextResponse.json({ token });
  }

  return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
}
