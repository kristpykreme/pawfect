# pawfect

A pet caring app

Project Group 7

client: frontend codes

server: backend codes

sqlfiles: sql schema and queries


# BUILDING THE FRONTEND

---------------------------

FIRST THING U NEED TO DO!!!

`cd client`

`npm install` -> this will install the packages needed for react app

u must already have a database with the name `petcare` and table `users`

---------------------------

`npm run dev` -> this command is to execute the react app. this will not connect to the server and database!!!! purely to see what ur website looks like

`npm run build` -> this command will build the react app. dist folder in client directory will be created with the the react app inside. dont need to copy to the server because i auto made it copy to server with postbuild.cjs file

*things to note*

vite is the compiler, just ignore it

if u want to edit the react app, it is in folder src.

src/components contains all the pages in the app.

src/components/Api has api.ts is responsible for talking to the server

remember to change ur password in server/app.py for sql

```
YOUR_POSTGRES_PASSWORD = "ur_password"

connection_string = f"postgresql://postgres:{YOUR_POSTGRES_PASSWORD}@localhost/petcare"
engine = sqlalchemy.create_engine(
    "postgresql://postgres:ur_password@localhost/petcare" ##I GET ERROR WHEN I USE {YOUR_POSTGRES_PASSWORD} PLS MANUALLY CHANGE IT :(
)
```
