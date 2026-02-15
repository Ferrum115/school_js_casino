from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = "database.db"

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/case/{case_id}")
def get_case(case_id: str):
    cases = {
        'USP-S': {
            "title": 'USP-S',
            "img": 'images/USPS_CASE.png',
            "price": '850',
            "skins": [
                9, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403,
                404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
                418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432
            ]
        },
        'EPSTEIN': {
            "title": 'EPSTEIN',
            "img": 'images/EPSTEIN.png',
            "price": '1000',
            "skins": [
                100,4,42,33,15,8,9,10,2,50,12
            ]
        }
    }

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
