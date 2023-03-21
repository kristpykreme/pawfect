from flask_cors import CORS, cross_origin
import json
import sqlalchemy
from flask_bcrypt import Bcrypt
from flask import Flask, request, Response, flash
from forms import RegistrationForm, LoginForm
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
def home():  # At the same home function as before
    return app.send_static_file('index.html')  # Return index.html from the static folder

@app.route('/sign-up', methods=['GET', 'POST'])
# ? a flask decorator listening for POST requests at the url /table-insert and handles the entry insertion into the given table/relation
# * You might wonder why PUT or a similar request header was not used here. Fundamentally, they act as POST. So the code was kept simple here
def signup():
    try:
        data = request.data.decode()
        user = json.loads(data)
        statement, checkEmail, checkUser = newUser(user)
        db.execute(statement)
        db.commit()
        return Response(statement.text, 200)
    except Exception as e:
        db.rollback()
        return Response(str(e), 403)

def newUser(user: Dict):
    username = user['username']
    email = user['email']
    hashed_password = bcrypt.generate_password_hash(user['password'])
    password = hashed_password.decode('ascii')
    statement = sqlalchemy.text(f"INSERT INTO users (username, email, password) VALUES ('{username}','{email}','{password}')")
    checkEmail = sqlalchemy.text(f"SELECT * FROM users WHERE email LIKE '{email}'")
    checkUser = sqlalchemy.text(f"SELECT * FROM users WHERE username LIKE '{username}'")
    return statement, checkEmail, checkUser

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server
