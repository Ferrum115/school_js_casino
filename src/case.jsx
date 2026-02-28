import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserProvider, useUser } from "./userContext";
export default function CasePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [roulette, setRoulette] = useState([]);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [wonSkin, setWonSkin] = useState(null);
  const { user, updateUser } = useUser();
  const {id} = useParams();
  const { addSkinToInventory } = useUser();
  const caseId = id?.toUpperCase();
  console.log(caseId)

  const handleAddToInventory = async (skin) => {
    const uniqueSkin = {
    ...skin,
    uniqueID: `${skin.ID}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    await fetch("http://127.0.0.1:8000/inventory/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        skin_id: skin.ID
      })
    });
    addSkinToInventory(uniqueSkin);
    setWonSkin(null);
  };

  const handleSell = async (skin) => {
    setWonSkin(null);
    updateUser({balance: user.balance + skin.price});
    updateUser({soldSkins: user.soldSkins + 1});
    await fetch("http://127.0.0.1:8000/inventory/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        skin_id: skin.ID
      })
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/case/${caseId}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [caseId, user]);

  const rarityOrder = ["Consumer","Industrial", "Mil-spec", "Restricted", "Classified", "Covert","Extraordinary"];
  const sortedSkins = data?.skins?.slice().sort((a, b) => {
    return rarityOrder.indexOf(a.Rarity) - rarityOrder.indexOf(b.Rarity);
  });
  
  const card_width = 170;
  const moving = winnerIndex !== null
      ? winnerIndex * card_width - 400 + card_width / 2
      : 0;
  const openCase = async() => {
    if (opening || !data) return;
    if (user.balance < parseInt(data.case.price)) {
      alert('Недостаточно средств!');
      return;
    }
    setOpening(true);
    setWinnerIndex(null);
    setRoulette([]);
    updateUser({
      balance: user.balance - parseInt(data.case.price),
      spent: (user.spent || 0) + parseInt(data.case.price),
      openedCases: (user.openedCases || 0) + 1
    });
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/case/${caseId}`,
        { method: "POST" }
      );
      const result = await res.json();
      const winner = result.skin;
      console.log(winner)
      const temp = [];
      for (let i = 0; i < 60; i++) {
        const randomSkin = data.skins[Math.floor(Math.random() * data.skins.length)];
        temp.push(randomSkin);
      }
      const winPosition = temp.length - 15;;
      temp[winPosition] = winner;
      setRoulette(temp);
      setTimeout(() => {
        setRoulette([...temp]);
        setWinnerIndex(winPosition);
      }, 50);
      setTimeout(() => {
        setOpening(false);
        setWonSkin(winner);
      }, 5050);
    } catch (err) {
      console.error(err);
      setOpening(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!data || !data.case) return <div>Кейс не найден</div>;
   return (
    <>
      <header className="hat">
        <div className="logo">
          <img src="/images/light_logo.png" alt="logo"/>
        </div>

        <div className="menu">
           <Link to="/"><button>Кейсы</button></Link>
          <button>Улучшение</button>
          <Link to="/profile"><button>Контракт</button></Link>
          <Link to='/taptap'><button>Фармилка</button></Link>
        </div>

        <div className="user">
          <div className="balance">
            {user.balance.toFixed(2)} арбузиков
          </div>
          <Link to='/profile'>
            <img className="avatar" src={user.avatar} alt="avatar"/>
          </Link>
          <span>{user.nickname}</span>
        </div>
      </header>

      <div className="container">
        <h1>{data.case.title}</h1>
        <div className="case-img">
          <img src={data.case.img} alt={data.case.title}/>
        </div>

        <div className="case-price">Цена: {data.case.price} арбузиков</div>
        <button id="opener" onClick={openCase} disabled={opening} className="open-button">
          <img src={
            opening
            ? "/images/disabled_button.png"
            : "/images/active_button.png"
            } alt="Открыть кейс"
          />
        </button>
        {roulette.length > 0 && (
          <div className="roulette-wrapper">
            <div className="roulette-line"></div>
            <div className="roulette" style={{transform:`translateX(-${moving}px)`}} >
              {roulette.map((skin, index) => (
                <div className={`roulette-skin-card ${skin.Rarity}`} key={index}>
                  <img src={skin.Image_path} alt={skin.Name}/>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="skin-preview">
          {sortedSkins.map(skin => (
            <div className={`skin-card ${skin.Rarity}`} key={skin.ID}>
              <img src={skin.Image_path} alt={skin.Name}/>
              <div>{skin.Name}</div>
            </div>
          ))}
        </div>
      </div>

      {wonSkin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Вам выпал:</h2>
            <div className={`skin-card big ${wonSkin.Rarity}`}>
              <img src={wonSkin.Image_path} alt={wonSkin.Name} />
              <div >{wonSkin.Name}</div>
              <div>Цена: {(wonSkin.price)} арбузиков</div>
            </div>
            <div className="modal-buttons">
              <button className="skin-action-button"  onClick={() => handleAddToInventory(wonSkin)}>
                <img src="/images/ToInventory.png" alt="в инвентарь"/>
              </button>
              <button className="skin-action-button" onClick={() => handleSell(wonSkin)}>
                <img src="/images/sell.png" alt="в инвентарь"/>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {opening && (
        <div className="block"></div>
      )}
    </>
  );
}
