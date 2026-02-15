import React, { useEffect, useState } from "react";

export default function CasePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get("id");
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
  }, [caseId]);
  const rarityOrder = ["Consumer","Industrial", "Mil-spec", "Restricted", "Classified", "Covert","Extraordinary"];
  const sortedSkins = data?.skins?.slice().sort((a, b) => {
  return rarityOrder.indexOf(a.Rarity) - rarityOrder.indexOf(b.Rarity);
});
  if (loading) return <div>Загрузка...</div>;
  if (!data || !data.case) return <div>Кейс не найден</div>;
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
          <button>Фармилка</button>
        </div>

        <div className="user">
          <div className="balance">10000 шлепок</div>
          <img className="avatar" src="img/avatar.png" alt="avatar"/>
        </div>
      </header>

      <div className="container">
        <h1>{data.case.title}</h1>
        <div className="case-img">
          <img src={data.case.img} alt={data.case.title}/>
        </div>

        <div className="case-price">Цена: {data.case.price} арбузиков</div>
        <button id="opener">Открыть кейс</button>

        <div className="skin-preview">
          {sortedSkins.map(skin => (
            <div className={`skin-card ${skin.Rarity}`} key={skin.ID}>
              <img src={skin.Image_path} alt={skin.Name}/>
              <div>{skin.Name}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
