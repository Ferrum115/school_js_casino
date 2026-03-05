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

if os.path.getsize("data.txt") == 0:
    with open("data.txt", "wb") as f:
        pickle.dump({}, f)

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
        "price": '6',
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
    },
    'SHREK': {
        "title": 'SHREK',
        "img": '/images/shrek.png',
        "price": '0.89',
        "skins": [
            120, 1104, 267, 595, 1056, 425, 1119, 426, 748, 212, 493, 457, 844, 993, 1295, 352, 1125, 183, 243, 920,
            772, 1455
        ]
    },
    'DEEP_ROCK': {
        "title": 'DEEP ROCK',
        "img": '/images/deep.png',
        "price": '3',
        "skins": [
            1052,534,838,985,1070,225,145,806,752,77,430,116,1155,666,453,90,8,994,854,466,236,781
        ]
    },
    'HELLDIVERS': {
        "title": 'HELLDIVERS',
        "img": '/images/helldiver.png',
        "price": '5',
        "skins": [
            77,833,654,1075,1160,112,25,1215,247,324,1146,196,553,1298,1005,401,670,893,464,1093,1009,201,776,65,774,481,575,735,474,1573,1612,1631
        ]
    },
    'DRAGON': {
        "title": 'DRAGON',
        "img": '/images/toothless.png',
        "price": '9',
        "skins": [
            103,844,191,234,770,61,1375,1142,766,573,896,479,11,1459,1492
        ]
    },
    'ZAREGAI': {
        "title": 'ZAREGAI',
        "img": '/images/zaregai.png',
        "price": '10',
        "skins": [
            914,445,113,395,189,891,60,717,757,705,543,448,449,247,939,467,203,576,54,772,422,1606,1484
        ]
    },
    'TBANK': {
        "title": 'T-BANK',
        "img": '/images/love.png',
        "price": '5',
        "skins": [
            933,190,1147,327,560,408,480,474,573,575,144,481,572,65,466,768
        ]
    },
    'POVAR': {
        "title": 'POVAR',
        "img": '/images/povar.png',
        "price": '60',
        "skins": [
            768,404,559,565,892,10,54,779,578,483,479,55,784,574,486,475,1447,1432,1433,1448,1510,1509,1515,1519,1518,1517,1488
        ]
    },
    'GYM': {
        "title": 'GYM 5x30',
        "img": '/images/gym.png',
        "price": '70',
        "skins": [
            62,723,460,765,565,554,467,458,461,725,1144,576,737,200,578,55,784,515,571,773,475,732,482,577
        ]
    },
    'EGYPT': {
        "title": 'EGYPT',
        "img": '/images/faraon.png',
        "price": '7',
        "skins": [
            3,448,94,242,1339,938,203,780,476,995,484,782,1535,1431,1550,1510
        ]
    },
    'CHEB': {
        "title": 'CHEBURASHKA',
        "img": '/images/cheb.png',
        "price": '35',
        "skins": [
            1149,894,558,197,9,144,471,896,485,573,477,1627,1485,1579,1512,1439
        ]
    },
    'STAR': {
        "title": 'STAR CITIZEN',
        "img": '/images/citizen.png',
        "price": '15',
        "skins": [
           451,1148,60,617,736,771,56,200,474,580
        ]
    },
    'EKB': {
        "title": 'EKB',
        "img": '/images/ekb.png',
        "price": '100',
        "skins": [
            178,8,613,458,621,777,479,734,577,579
        ]
    },
    'AFRICA': {
        "title": 'AFRICA',
        "img": '/images/banana.png',
        "price": '115',
        "skins": [
            458,55,734,486,570,472,579
        ]
    },
    'GEMINI': {
        "title": 'GEMINI',
        "img": '/images/gemini.png',
        "price": '4',
        "skins": [
            471,181,250,771,566,671,1158,1582,246,1381,514,893,10,1148,935,220,1191,1227,545,707,165,1050,2,282,954
        ]
    },
    'GPT': {
        "title": 'GPT',
        "img": '/images/gpt.png',
        "price": '2',
        "skins": [
           186,398,399,615,1620,493,143,459,22,667,274,130,369,75,322,751,1334,1123,127,1181
        ]
    },
    'DEEPSEEK': {
        "title": 'DEEPSEEK',
        "img": '/images/deepseek.png',
        "price": '1.5',
        "skins": [
            766,776,566,774,670,1337,889,314
        ]
    },
    'COPILOT': {
        "title": 'COPILOT',
        "img": '/images/copilot.png',
        "price": '0.7',
        "skins": [
            88,709,893,1131,155,243,1295,1355,542,509,1297
        ]
    },
    'PE1': {
        "title": 'MIKU',
        "img": '/images/miku.png',
        "price": '200',
        "skins": [
            579,477,472,577,487,567,570,469,475,568,580,461,467,565,460,552
        ]
    },
    'PE2': {
        "title": '02',
        "img": '/images/whaaam.png',
        "price": '400',
        "skins": [
            569,786,472,577,487,567,570,482,731,773,732,475,568,486,580,515,574,784,480,55,11,578,730
        ]
    },
    'PE3': {
        "title": 'Rias Gremory',
        "img": '/images/whoom.png',
        "price": '500',
        "skins": [
            730,568,728,327,1411,1435,1497,477,515,580,786,579
        ]
    },
    'PE4': {
        "title": 'Akeno Himejima',
        "img": '/images/whooom.png',
        "price": '700',
        "skins": [
            94,86,190,720,769,461,725,726,568,475,570,567,577,472,477,786,569,579,1417,1441,1435,1451
        ]
    },
    'PE5': {
        "title": 'Vladilena Milizé',
        "img": '/images/whom.png',
        "price": '114',
        "skins": [
            917,184,87,544,352,510,324,1339,777,143
        ]
    },
    'PE6': {
        "title": 'Arufa',
        "img": '/images/whaam.png',
        "price": '50',
        "skins": [
            465,555,579
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
        weights.append(1/(float(skin["price"])**0.7))
    winner = random.choices(skins, weights=weights, k=1)[0]
    return {"skin": winner}