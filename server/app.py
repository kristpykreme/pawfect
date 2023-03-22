from flask_cors import CORS, cross_origin
import json
import sqlalchemy
from flask_bcrypt import Bcrypt
from flask import Flask, request, Response, flash
from typing import Dict

app = Flask(__name__, static_url_path='')  # Setup the flask app by creating an instance of Flask
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
# Eenabling the flask app to be able to communicate with any request source
CORS(app)

# bcrypt = Bcrypt(app)
# app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

YOUR_POSTGRES_PASSWORD = "urpassword"
connection_string = f"postgresql://postgres:{YOUR_POSTGRES_PASSWORD}@localhost/petcare"
engine = sqlalchemy.create_engine(
    "postgresql://postgres:urpassword@localhost/petcare"
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
            userDetails = {'username': checkUser[0], 'email': checkUser[1]} #username and email
            return userDetails
        else:
            return Response("Incorrect username/password", 403)
    except Exception as e:
        db.rollback()
        return Response("Server problem.", 403)
    

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server
