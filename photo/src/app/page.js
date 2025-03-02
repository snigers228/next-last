
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Фото выставка</h1>
      <img src="/path_to_image/photo.jpg" alt="Привлекательная картинка" />
      <nav>
        <ul>
          <li>
            <Link href="/login">Вход</Link>
          </li>
          <li>
            <Link href="/register">Регистрация</Link>
          </li>
          <li>
            <Link href="/search">Поиск изображений</Link>
          </li>
          <li>
            <Link href="/profile">Профиль</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
