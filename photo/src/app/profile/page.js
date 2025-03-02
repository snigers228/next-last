
'use client';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = cookie.get('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload.email);
    } else {
      setError('Необходимо войти в систему.');
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Логика смены пароля
  };

  return (
    <div>
      <h1>Профиль пользователя</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Email: {user}</p>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Сменить пароль</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
