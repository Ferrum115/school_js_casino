import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserProvider, useUser } from "./userContext";
import Login from "./login";
export default function Home(){
    const [cases, setCases] = useState({});
    const [newCases, setNewCases] = useState({});
    useEffect(() => {
        fetch("http://127.0.0.1:8000/cases")
            .then(res => res.json())
            .then(data => {
                setCases(data.cases || {});
                setNewCases(data.newcases || {});
            })
            .catch(err => console.error(err));
    }, []);

    const { user, login } = useUser();
    if (!user) {
        return <Login onLogin={login} />;
    }
    return (
        <>
        <header className="hat">
            <div className="logo">
                <img src="images/light_logo.png" alt="logo" />
            </div>
            <div className="menu">
                <Link to="/"><button>Кейсы</button>
                </Link>
                <button>Улучшение</button>
                <button>Контракт</button>
                <Link to='/taptap'><button>Фармилка</button></Link>
            </div>
            <div className="user">
                <div className="balance">
                    {user.balance.toFixed(2)} арбузиков
                </div>
                <Link to='/profile'><img className="avatar" src={user.avatar} alt="avatar" /></Link>
                <span>{user.nickname}</span>
            </div>
        </header>

        <main className="container">
            <h1 className="type_name">Рандом кейсы</h1>
            <div className="table">
                <Link to="/case/USP-S" className="case-card">
                    <div className="case-img">
                    <img src="/images/USPS_CASE.png" />
                    </div>
                    <div className="case-title">USP-S</div>
                    <div className="case-price">Цена: 4</div>
                </Link>

                <Link to="/case/CHEB" className="case-card">
                    <div className="case-img">
                        <img src="/images/cheb.png" />
                    </div>
                    <div className="case-title">CHEBURASHKA</div>
                    <div className="case-price">Цена: 35</div>
                </Link>

                <Link to="/case/EKB" className="case-card">
                    <div className="case-img">
                    <img src="/images/ekb.png" />
                    </div>
                    <div className="case-title">EKB</div>
                    <div className="case-price">Цена: 100</div>
                </Link>

                <Link to="/case/AFRICA" className="case-card">
                    <div className="case-img">
                        <img src="/images/banana.png" />
                    </div>
                    <div className="case-title">AFRICA</div>
                    <div className="case-price">Цена: 115</div>
                </Link>

                <Link to="/case/EVA-02" className="case-card">
                    <div className="case-img">
                        <img src="/images/eva02.png" />
                    </div>
                    <div className="case-title">EVA-02</div>
                    <div className="case-price">Цена: 17</div>
                </Link>
            </div>

            <h1 className="type_name">Игровые кейсы</h1>
            <div className="table">
                <Link to="/case/STAR" className="case-card">
                    <div className="case-img">
                        <img src="/images/citizen.png" />
                    </div>
                    <div className="case-title">STAR CITIZEN</div>
                    <div className="case-price">Цена: 15</div>
                </Link>
                
                <Link to="/case/DEVIANT" className="case-card">
                    <div className="case-img">
                        <img src="/images/cyberlife.png" />
                    </div>
                    <div className="case-title">DEVIANT</div>
                    <div className="case-price">Цена: 7</div>
                </Link>

                <Link to="/case/DEEP_ROCK" className="case-card">
                    <div className="case-img">
                        <img src="/images/deep.png" />
                    </div>
                    <div className="case-title">DEEP ROCK</div>
                    <div className="case-price">Цена: 3</div>
                </Link>

                <Link to="/case/HELLDIVERS" className="case-card">
                    <div className="case-img">
                        <img src="/images/helldiver.png" />
                    </div>
                    <div className="case-title">HELLDIVERS</div>
                    <div className="case-price">Цена: 5</div>
                </Link>
            </div>

            <h1 className="type_name">Мем кейсы</h1>
            <div className="table">
                <Link to="/case/EPSTEIN" className="case-card">
                    <div className="case-img">
                        <img src="/images/EPSTEIN.png" />
                    </div>
                    <div className="case-title">EPSTEIN</div>
                    <div className="case-price">Цена: 6</div>
                </Link>

                <Link to="/case/ZAREGAI" className="case-card">
                    <div className="case-img">
                        <img src="/images/zaregai.png" />
                    </div>
                    <div className="case-title">ZAREGAI</div>
                    <div className="case-price">Цена: 10</div>
                </Link>

                <Link to="/case/SHREK" className="case-card">
                    <div className="case-img">
                        <img src="/images/shrek.png" />
                    </div>
                    <div className="case-title">SHREK</div>
                    <div className="case-price">Цена: 0.89</div>
                </Link>

                <Link to="/case/POVAR" className="case-card">
                    <div className="case-img">
                        <img src="/images/povar.png" />
                    </div>
                    <div className="case-title">POVAR</div>
                    <div className="case-price">Цена: 60</div>
                </Link>

                <Link to="/case/GYM" className="case-card">
                    <div className="case-img">
                        <img src="/images/gym.png" />
                    </div>
                    <div className="case-title">GYM 5x30</div>
                    <div className="case-price">Цена: 70</div>
                </Link>

            </div>

            <h1 className="type_name">Сеттинг кейсы</h1>
            <div className="table">
                <Link to="/case/DRAGON" className="case-card">
                    <div className="case-img">
                        <img src="/images/toothless.png" />
                    </div>
                    <div className="case-title">Dragon</div>
                    <div className="case-price">Цена: 9</div>
                </Link>

                <Link to="/case/EGYPT" className="case-card">
                    <div className="case-img">
                        <img src="/images/faraon.png" />
                    </div>
                    <div className="case-title">EGYPT</div>
                    <div className="case-price">Цена: 7</div>
                </Link>

            </div>

            <h1 className="type_name">Нейрокейсы</h1>
            <div className="table">
                <Link to="/case/GEMINI" className="case-card">
                    <div className="case-img">
                        <img src="/images/gemini.png" />
                    </div>
                    <div className="case-title">GEMINI</div>
                    <div className="case-price">Цена: 4</div>
                </Link>

                <Link to="/case/GPT" className="case-card">
                    <div className="case-img">
                        <img src="/images/gpt.png" />
                    </div>
                    <div className="case-title">GPT</div>
                    <div className="case-price">Цена: 2</div>
                </Link>

                <Link to="/case/DEEPSEEK" className="case-card">
                    <div className="case-img">
                        <img src="/images/deepseek.png" />
                    </div>
                    <div className="case-title">DEEPSEEK</div>
                    <div className="case-price">Цена: 1.5</div>
                </Link>

                <Link to="/case/COPILOT" className="case-card">
                    <div className="case-img">
                        <img src="/images/copilot.png" />
                    </div>
                    <div className="case-title">COPILOT</div>
                    <div className="case-price">Цена: 0.7</div>
                </Link>

            </div>

            <h1 className="type_name">Спонсор кейс</h1>
            <div className="table">
                <Link to="/case/TBANK" className="case-card">
                    <div className="case-img">
                        <img src="/images/love.png" />
                    </div>
                    <div className="case-title">T-BANK</div>
                    <div className="case-price">Цена: 5</div>
                </Link>

            </div>

            <h1 className="type_name">Пляжный эпизод</h1>
            <div className="table">
                <Link to="/case/PE1" className="case-card">
                    <div className="case-img">
                        <img src="/images/miku.png" />
                    </div>
                    <div className="case-title">MIKU</div>
                    <div className="case-price">Цена: 200</div>
                </Link>

                <Link to="/case/PE2" className="case-card">
                    <div className="case-img">
                        <img src="/images/whaaam.png" />
                    </div>
                    <div className="case-title">02</div>
                    <div className="case-price">Цена: 400</div>
                </Link>

                <Link to="/case/PE3" className="case-card">
                    <div className="case-img">
                        <img src="/images/whoom.png" />
                    </div>
                    <div className="case-title">Rias Gremory</div>
                    <div className="case-price">Цена: 500</div>
                </Link>

                <Link to="/case/PE4" className="case-card">
                    <div className="case-img">
                        <img src="/images/whooom.png" />
                    </div>
                    <div className="case-title">Akeno Himejima</div>
                    <div className="case-price">Цена: 700</div>
                </Link>

                <Link to="/case/PE5" className="case-card">
                    <div className="case-img">
                        <img src="/images/whom.png" />
                    </div>
                    <div className="case-title">Vladilena Milizé</div>
                    <div className="case-price">Цена: 114</div>
                </Link>

                <Link to="/case/PE6" className="case-card">
                    <div className="case-img">
                        <img src="/images/whaam.png" />
                    </div>
                    <div className="case-title">Arufa</div>
                    <div className="case-price">Цена: 50</div>
                </Link>
            </div>

            {Object.keys(newCases).length > 0 && (
                    <>
                        <h1>Новые кейсы</h1>
                        <div className="table">
                            {Object.entries(newCases).map(([caseId, caseData]) => (
                                <Link key={caseId} to={`/case/${caseId}`} className="case-card">
                                    <div className="case-img">
                                        <img src={caseData.img} alt={caseData.title} />
                                    </div>
                                    <div className="case-title">{caseData.title}</div>
                                    <div className="case-price">Цена: {caseData.price}</div>
                                </Link>
                            ))}
                        </div>
                    </>
            )}

        </main>
        </>
    );
}