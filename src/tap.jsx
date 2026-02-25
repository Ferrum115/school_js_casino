import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useUser } from './userContext';
export default function TapCounter() {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, updateBalance } = useUser();

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    window.location.href = '/';
    return null;
  }
  
  const handleTap = () => {
    setCount(prev => prev + 1);
  };

  const handleConfirm = () => {
    updateBalance(user.balance + count);
    setCount(0);
    
  };

  const formattedCount = String(count).padStart(8, '0');

  const getBackgroundImage = () => {
    if (isPressed) return `url(/images/active-arbuz.gif)`;
    if (isHovered) return `url(/images/static_arbuz.png)`;
    return `url(/images/arbuz.png)`;
  };

  return (
    <>
    <header className="hat">
        <div className="logo">
          <img src="images/light_logo.png" alt="logo"/>
        </div>

        <div className="menu">
           <Link to="/"><button>Кейсы</button></Link>
           <button>Улучшение</button>
           <button>Контракт</button>
           <Link to="/taptap"><button>Фармилка</button></Link>
        </div>

        <div className="user">
        <div className="balance">{user.balance} арбузиков</div>
        <img className="avatar" src={user.avatar} alt="avatar"/>
        <span>{user.nickname}</span>
        </div>

      </header>
    <div className="container-frame">
      <div className="container-counter">
        <b className="counter">{formattedCount}</b>
      </div>
      <button
        type="button"
        className="confirm"
        onClick={handleConfirm}>ЗАЧИСЛИТЬ</button>
      <button
        type="button"
        className="tap"
        style={{ backgroundImage: getBackgroundImage() }}
        onClick={handleTap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}></button>
    </div>
    </>
  );
};


