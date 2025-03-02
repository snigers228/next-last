
import { NextResponse } from 'next/server';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_API_KEY'; // Заменить API

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1'; 
  const perPage = searchParams.get('per_page') || '10'; 
  if (!query) {
    return NextResponse.json({ message: 'Отсутствует параметр запроса' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: UNSPLASH_ACCESS_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка при поиске' }, { status: 500 });
  }
}
