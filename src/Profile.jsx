import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "./userContext";

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  if (!user) {
    return <div>Загрузка...</div>;
  }
  const inventory = user.inventory || [];
  const handleSell = (skin) => {
    console.log(skin.price)
    updateUser({
      balance: user.balance + Number(skin.price),
      soldSkins: user.soldSkins + 1,
      inventory: user.inventory.filter(s => s.uniqueID !== skin.uniqueID)
    });
  };
  return (
    <>
      <header className="hat">
        <div className="logo">
          <img src="/images/light_logo.png" alt="logo" />
        </div>

        <div className="menu">
          <Link to="/"><button>Кейсы</button></Link>
          <button>Улучшение</button>
          <Link to="/profile"><button>Контракт</button></Link>
          <Link to="/taptap"><button>Фармилка</button></Link>
        </div>

        <div className="user">
          <div className="balance">{user.balance.toFixed(2)} арбузиков</div>
          <Link to='/profile'><img className="avatar" src={user.avatar} alt="avatar" /></Link>
          <span>{user.nickname}</span>
        </div>
      </header>

      <div className="container-profile">
        <img
          className="prof-img"
          src={user.avatar || "/images/avatar.png"}
          alt="Avatar"
        />
        <h1 className="name">{user.nickname}</h1>
        <h2 className="money-bye">Потрачено: {user.spent || 0} арбузов</h2>
        <h2 className="case-amount">Открыто кейсов: {user.openedCases || 0}</h2>
        <h2 className="skin-bye">Продано скинов: {user.soldSkins || 0}</h2>
      </div>

      <div className="container-inventory">
        <div className="container-skins">
          {inventory.map((skin, index) => (
            <div className={`container-sk ${skin.Rarity}`} key={skin.uniqueID}>
              <img className="skin-img" src={skin.Image_path} alt={skin.Name} />
              <button
                className="sell"
                onClick={() => handleSell(skin)}><img src="/images/sold.png" alt="sell"/>
              </button>
              <h3 className="skin-name">{skin.Name}</h3>
              <h3 className="skin-price">{skin.price}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}