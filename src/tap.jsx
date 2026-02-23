import React, { useState } from 'react';

const TapCounter = () => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleTap = () => {
    setCount(prev => prev + 1);
  };

  const handleConfirm = () => {
    setCount(0);
  };

  const formattedCount = String(count).padStart(8, '0');

  const getBackgroundImage = () => {
    if (isPressed) return 'url(images/active-arbuz.gif)';
    if (isHovered) return 'url(images/static_arbuz.png)';
    return 'url(images/arbuz.png)';
  };

  return (
    <>
    <header className="hat">
        <div className="logo">
          <img src="images/light_logo.png" alt="logo"/>
        </div>

        <div className="menu">
           <a href="index.html"><button>Кейсы</button></a>
           <button>Улучшение</button>
           <button>Контракт</button>
           <a href="jsfarm.html"><button>Фармилка</button></a>
        </div>

        <div className="user">
          <div className="balance">10000 шлепок</div>
          <img className="avatar" src="img/avatar.png" alt="avatar"/>
        </div>
      </header>
    <div className="container-frame">
      <div className="container-counter">
        <b className="counter">{formattedCount}</b>
      </div>
      <button
        type="button"
        className="confirm"
        onClick={handleConfirm}
      >
        ЗАЧИСЛИТЬ
      </button>
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

export default TapCounter;



