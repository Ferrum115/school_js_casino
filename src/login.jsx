import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      onLogin(nickname.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Введите ваш никнейм</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Никнейм"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="login-input"
            autoFocus
          />
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}