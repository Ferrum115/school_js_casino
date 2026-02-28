from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import random
from pydantic import BaseModel
from typing import List

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CaseData(BaseModel):
    id: str
    title: str
    image: str
    price: int
    skins: List[int]

cases = {
    'USP-S': {
        "title": 'USP-S',
        "img": '/images/USPS_CASE.png',
        "price": '10',
        "skins": [
            9, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403,
            404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
            418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432
        ]
    },
    'EPSTEIN': {
        "title": 'EPSTEIN',
        "img": '/images/EPSTEIN.png',
        "price": '1000',
        "skins": [
            100,4,42,33,15,8,9,10,2,50,12
        ]
    }
}

DATABASE = "database.db"
weight = {
    "Consumer": 0.80,
    "Industrial": 0.16,
    "Mil-spec": 0.032,
    "Restricted": 0.0064,
    "Classified": 0.0013,
    "Covert": 0.00026,
    "Extraordinary": 0.00004
}

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


@app.get("/case/{case_id}")
def get_case(case_id: str):
    case_data = cases.get(case_id)
    skin_ids = case_data["skins"]
    conn = get_db()
    cursor = conn.cursor()

    placeholders = ",".join("?" for _ in skin_ids)
    cursor.execute(f"SELECT * FROM skins WHERE ID IN ({placeholders})", skin_ids)
    skins = cursor.fetchall()
    conn.close()

    return {
        "case": {
            "title": case_data["title"],
            "img": case_data["img"],
            "price": case_data["price"]
        },
        "skins": [dict(skin) for skin in skins]
    }

@app.post("/case")
def add_case(caseData: CaseData):
    try:
        cases[caseData.id] = {
            "title": caseData.title,
            "img": caseData.image,
            "price": str(caseData.price),
            "skins": caseData.skins
        }
        print(caseData)
        print(cases)
        return {"status": "success", "data": cases[caseData.id]}
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
@app.post("/case/{case_id}")
def open_case(case_id: str):
    case_data = cases.get(case_id)
    if not case_data:
        return {"error": "Case not found"}

    skin_ids = case_data["skins"]
    conn = get_db()
    cursor = conn.cursor()

    placeholders = ",".join("?" for _ in skin_ids)
    cursor.execute(f"SELECT * FROM skins WHERE ID IN ({placeholders})", skin_ids)
    skins = cursor.fetchall()
    conn.close()
    skins = [dict(skin) for skin in skins]
    weights = [
        weight.get(skin["Rarity"], 1)
        for skin in skins
    ]
    winner = random.choices(skins, weights=weights, k=1)[0]
    return {"skin": winner}