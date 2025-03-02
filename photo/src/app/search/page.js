
'use client';

import { useState } from 'react';
import axios from 'axios';

const SearchImages = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await axios.get(`/api/search`, {
        params: { query, page, per_page: 10 },
      });
      setImages(response.data.results);
      setTotalPages(Math.ceil(response.data.total / 10)); 
      setPage(1); 
    } catch {
      setError('Ошибка при поиске изображений');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = async () => {
    if (page < totalPages) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/search`, {
          params: { query, page: page + 1, per_page: 10 },
        });
        setImages(response.data.results);
        setPage(page + 1); 
      } catch {
        setError('Ошибка при загрузке следующей страницы');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (page > 1) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/search`, {
          params: { query, page: page - 1, per_page: 10 },
        });
        setImages(response.data.results);
        setPage(page - 1); 
      } catch {
        setError('Ошибка при загрузке предыдущей страницы');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Поиск изображений</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Введите запрос"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Поиск</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <div>
        {images.length > 0 && images.map((img) => (
          <img key={img.id} src={img.urls.small} alt={img.description} />
        ))}
      </div>

      {/* Пагинация */}
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Назад</button>
        <span>Страница {page} из {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages || totalPages === 0}>Вперед</button>
      </div>
    </div>
  );
};

export default SearchImages;
