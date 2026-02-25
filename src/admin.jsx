import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Admin() {
    const [username, setUsername] = useState('');
    const [itemid, setItemid] = useState(0);
    const [money, setMoney] = useState(0);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [skins, setSkins] = useState([0]);

    const sendCase = () => {
        fetch('http://127.0.0.1:8000/case/', {
            method: 'POST',
            body: JSON.stringify({
                "id": id,
                "title": name,
                "image": image,
                "price": price,
                "skins": skins
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            })
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
                    <img src="/images/pfp.jpg" alt="logo"/>
                </div>

                <div className="menu">
                    <a href="index.html"><button>Кейсы</button></a>
                    <button>Улучшение</button>
                    <button>Контракт</button>
                    <button>Фармилка</button>
                </div>

                <div className="user">
                    <div className="balance">многа деняк</div>
                    <img className="avatar" src="/images/pfp.jpg" alt="avatar"/>
                </div>

                <button>exit admin</button>
                <section>
                    <a>user toolkit</a>
                    <input type="text" value={username} onChange={setUsername}> target username</input>
                    <input type="number" value={itemid} onChange={setItemid}> item id</input>
                    <input type="number" value={money} onChange={setMoney}> money</input>
                    <button onClick={handleUserInventory}>add</button>
                    <button onClick={banUser}>ban</button>
                </section>
                <section>
                    <a>case toolkit</a>
                    <input type="text" value={id} onChange={setId}> case id</input>
                    <input type="text" value={name} onChange={setName}> case name</input>
                    <input type="number" value={price} onChange={setPrice}> case price</input>
                    <input type="text" value={image} onChange={setImage}> image id</input>
                    <input type="text" value={skins} onChange={setSkins}> skins id</input>
                    <button onClick={sendCase}>add</button>
                </section>
            </header>
        </>
    );
}