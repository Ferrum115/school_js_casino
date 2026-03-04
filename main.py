from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import random
from pydantic import BaseModel
from typing import List
import pickle

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
    skins: str

cases = {
    'USP-S': {
        "title": 'USP-S',
        "img": '/images/USPS_CASE.png',
        "price": '4',
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
            100, 4, 42, 33, 15, 8, 9, 10, 2, 50, 12
        ]
    },
    'DEVIANT': {
        "title": 'DEVIANT',
        "img": '/images/cyberlife.png',
        "price": '7',
        "skins": [
            762, 543, 759, 358, 1007, 556, 457, 718, 854, 771, 463, 465, 327, 1009, 576, 896, 56, 405, 774, 483, 11,
            408, 571, 1451, 1452, 1453, 1454
        ]
    },
    'EVA-02': {
        "title": 'EVA-02',
        "img": '/images/eva02.png',
        "price": '17',
        "skins": [
            973, 1290, 497, 1071, 269, 48, 225, 602, 145, 752, 330, 1038, 1000, 763, 99, 90, 817, 1340, 245, 994, 197,
            1141, 465, 725, 940, 781, 54, 573, 480, 408, 1449, 1450
        ]
    }
    ,
    'SHREK': {
        "title": 'SHREK',
        "img": '/images/shrek.png',
        "price": '0.89',
        "skins": [
            120, 1104, 267, 595, 1056, 425, 1119, 426, 748, 212, 493, 457, 844, 993, 1295, 352, 1125, 183, 243, 920,
            772, 1455
        ]
    }
}


newcases = {}

with open("data.txt", "rb") as f:
    newcases = pickle.load(f)

DATABASE = "database.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/cases")
def get_cases():
    return {"cases": cases, "newcases": newcases}

@app.get("/case/{case_id}")
def get_case(case_id: str):
    case_data = cases.get(case_id) or newcases.get(case_id)
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
        newcases[caseData.id] = {
            "title": caseData.title,
            "img": caseData.image,
            "price": str(caseData.price),
            "skins": caseData.skins
        }
        pickle.dump(newcases, open("data.txt", "wb"))
        return {"status": "success", "data": newcases[caseData.id]}
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
@app.post("/case/{case_id}")
def open_case(case_id: str):
    case_data = cases.get(case_id) or newcases.get(case_id)
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
    weights=[]
    i = [float(skin["price"]) for skin in skins]
    average_price = sum(i) / len(i)
    print(average_price)
    for skin in skins:
        weights.append(1/(float(skin["price"])**0.48))
    winner = random.choices(skins, weights=weights, k=1)[0]
    return {"skin": winner}