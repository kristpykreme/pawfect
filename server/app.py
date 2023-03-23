from flask_cors import CORS, cross_origin
import json
import sqlalchemy
from flask_bcrypt import Bcrypt
from flask import Flask, request, Response, flash, session, jsonify
from typing import Dict

app = Flask(__name__, static_url_path='')  # Setup the flask app by creating an instance of Flask
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
# Eenabling the flask app to be able to communicate with any request source
CORS(app)

YOUR_POSTGRES_PASSWORD = "ur_password"
connection_string = f"postgresql://postgres:{YOUR_POSTGRES_PASSWORD}@localhost/petcare"
engine = sqlalchemy.create_engine(
    "postgresql://postgres:ur_password@localhost/petcare"
)

db = engine.connect()

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/sign-up', methods=['GET', 'POST'])
def signUp():
    try:
        data = request.data.decode()
        user = json.loads(data)
        statement, checkEmail, checkUser = newUser(user)
        emailRes = db.execute(checkEmail).fetchone()
        userRes = db.execute(checkUser).fetchone()
        if emailRes and userRes:
            return Response("Account with this email and username already exists.", 403)
        elif userRes:
            return Response("Account with this username already exists.", 403)
        elif emailRes:
            return Response("Account with this email already exists.", 403)
        db.execute(statement)
        db.commit()
        return Response(statement.text, 200)
    except Exception as e:
        db.rollback()
        return Response("Server problem.", 403)

def newUser(user: Dict):
    username = user['username']
    email = user['email']
    hashed_password = bcrypt.generate_password_hash(user['password'])
    password = hashed_password.decode('ascii')
    statement = sqlalchemy.text(f"INSERT INTO users (username, email, password) VALUES ('{username}','{email}','{password}')")
    checkEmail = sqlalchemy.text(f"SELECT * FROM users WHERE email LIKE '{email}'")
    checkUser = sqlalchemy.text(f"SELECT * FROM users WHERE username LIKE '{username}'")
    return statement, checkEmail, checkUser

@app.route('/login', methods=['GET'])
def signIn():
    try:
        email = request.args.get('email', default="", type=str)
        password = request.args.get('password', default="", type=str)
        statement = sqlalchemy.text(f"SELECT * FROM users WHERE email LIKE '{email}'")
        checkUser = db.execute(statement).fetchone()
        if checkUser and bcrypt.check_password_hash(checkUser[2], password):
             #create session data
            session['username'] = checkUser[0]
            session['email'] = checkUser[1]
            session['login'] = True
            userDetails = {'username': checkUser[0], 'email': checkUser[1]} #username and email
            return userDetails
        else:
            return Response("Incorrect username/password", 403)
    except Exception as e:
        db.rollback()
        return Response("Server problem.", 403)

@app.route('/pet-sitters', methods=['GET', 'POST'])
def createProfile():
    try:
        data = request.data.decode()
        petSitter = json.loads(data)
        sitterUname = petSitter['username']
        sitterSDate = petSitter['startDate']
        sitterEDate = petSitter['endDate']
        sitterPrice = petSitter['price']
        sitterDog = petSitter['dog']
        sitterCat = petSitter['cat']
        sitterPetBoarding = petSitter['petBoarding']
        sitterDogWalking = petSitter['dogWalking']
        sitterPetGrooming = petSitter['petGrooming']
        sitterPetDaycare = petSitter['petDaycare']
        sitterPetSitting = petSitter['petSitting']
        sitterPetTaxi = petSitter['petTaxi']
        statement = sqlalchemy.text(f"INSERT INTO petsitters (username, startDate, endDate, price, dog, cat, petBoarding, dogWalking, petGrooming, petDaycare, petSitting, petTaxi) "
                                    f"VALUES ('{sitterUname}','{sitterSDate}','{sitterEDate}','{sitterPrice}','{sitterDog}','{sitterCat}','{sitterPetBoarding}','{sitterDogWalking}','{sitterPetGrooming}','{sitterPetDaycare}','{sitterPetSitting}','{sitterPetTaxi}');"
                                    )
        db.execute(statement)
        db.commit()
        return Response(statement.text, 200)
    except Exception as e:
        db.rollback()
        return Response("Server problem.", 403)
    
@app.route('/find-services', methods=['GET','POST'])
def findServices():
    if request.method == "GET":
        print(session['username'])
        statement = sqlalchemy.text(f"SELECT * FROM petsitters;")
        res = db.execute(statement).fetchall()
        db.commit()
        petSitters = []
        data = {}
        for result in res:
            data = {'username':result[0], 
                    'startDate':result[1], 
                    'endDate':result[2], 
                    'price':result[3], 
                    'dog':result[4], 
                    'cat':result[5], 
                    'petBoarding':result[6], 
                    'dogWalking':result[7], 
                    'petGrooming':result[8], 
                    'petDaycare':result[9], 
                    'petSitting':result[10],
                    'petTaxi':result[11]}
            petSitters.append(data)
            data = {}
        return jsonify(petSitters), 200

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run(debug=True)  # Start the server
