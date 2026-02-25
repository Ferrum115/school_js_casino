import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('Введите никнейм');
      return;
    }

    const user = {
      nickname: nickname.trim(),
      balance: 10000,
      avatar: 'images/avatar.png'
    };

    onLogin(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Вход в симулятор</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input
              type="text"
              placeholder="Введите ваш никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="auth-input"
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}