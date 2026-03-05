import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./userContext";
import Login from "./login";
export default function Admin() {
    const { user, login } = useUser();
    const [cases, setCases] = useState({});
    const [newCases, setNewCases] = useState({});
    const [username, setUsername] = useState('');
    const [itemid, setItemid] = useState(0);
    const [money, setMoney] = useState(0);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [skins, setSkins] = useState('');
    if (!user) return <Login onLogin={login} />;
    const sendCase = () => {
        fetch('http://127.0.0.1:8000/case', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            id: id,
            title: name,
            image: image,
            price: Number(price),
            skins: skins.split(',').map(Number)
        })
        })
    .then(r => r.json().then(data => ({status: r.status, data})))
    .then(res => {
        if (res.status === 422) {
            console.error("FastAPI недоволен полями:", res.data.detail);
        } else {
            console.log("Успех:", res.data);
            fetch("http://127.0.0.1:8000/cases")
                .then(res => res.json())
                .then(data => {
                    setCases(data.cases || {});
                    setNewCases(data.newcases || {});
                });
        }
    });
};
    const handleUserInventory = () => {
        fetch('http://127.0.0.1:8000/users', {
            method: "POST",
            body: JSON.stringify({key: "ass"})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };
    const banUser = () => {
        fetch('http://127.0.0.1:8000/users', {
            method: "POST",
            body: JSON.stringify({key: "banthisnga"})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    };
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
                {/* <section>
                    <a>user toolkit</a>
                    <span></span><input type="text" value={username} onChange={setUsername}/>
                    <input type="number" value={itemid} onChange={setItemid}> item id</input>
                    <input type="number" value={money} onChange={setMoney}> money</input>
                    <button onClick={handleUserInventory}>add</button>
                    <button onClick={banUser}>ban</button>
                </section> */}
                <section>
                    <div>case toolkit</div>

                    <div><input type="text" value={id} onChange={(e) => setId(e.target.value)}/> <span>case id</span> </div>
                    <div><input type="text" value={name} onChange={(e) => setName(e.target.value)}/> <span>case name</span> </div>
                    <div><input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/> <span>case price</span> </div>
                    <div><input type="text" value={image} onChange={(e) => setImage(e.target.value)}/> <span>image id</span> </div>
                    <div><input type="text" value={skins} onChange={(e) => setSkins(e.target.value)}/> <span>skins</span> </div>
                    <div><button type="button" onClick={sendCase} >add</button></div>
                </section>
                <button onClick={() => {
                    fetch("http://127.0.0.1:8000/cases")
                    .then(res => res.json())
                    .then(data => {
                        setCases(data.cases || {});
                        setNewCases(data.newcases || {});
                    });
                    }}>Обновить кейсы
                </button>
        </>
    );
}