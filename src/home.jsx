import React from "react";
import { Link } from "react-router-dom";
import { UserProvider, useUser } from "./userContext";
import Login from "./login";
export default function Home(){
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
            <h1>Оружейные кейсы</h1>
            <div className="table">
                <Link to="/case/USP-S" className="case-card">
                    <div className="case-img">
                    <img src="/images/USPS_CASE.png" />
                    </div>
                    <div className="case-title">USP-S</div>
                    <div className="case-price">Цена: 10</div>
                </Link>

                <Link to="/case/EPSTEIN" className="case-card">
                    <div className="case-img">
                        <img src="/images/EPSTEIN.png" />
                    </div>
                    <div className="case-title">EPSTEIN</div>
                    <div className="case-price">Цена: 1000</div>
                </Link>

            </div>
        </main>
        </>
    );
}