Angular CRUD Application with JSON Server

This is a CRUD (Create, Read, Update, Delete) web application built using Angular, HTML, CSS, Bootstrap, and JavaScript.  
It uses a JSON Server as a mock backend to store and manage data.

---

## Features

- Add new records (Create)
-  View all records (Read)
-  Edit and update existing records (Update)
-  Delete records (Delete)
-  Data stored and fetched from JSON Server
-  Responsive UI built with Bootstrap


 # Install Dependencies
npm install

# Run JSON Server

Make sure you have JSON Server installed:

npm install -g json-server


Then start it with:

npx json-server --watch db.json --port 3000


JSON Server will start on:

http://localhost:3000/users

# Run Angular Application

In another terminal, run:

ng serve


Angular app will run on:

http://localhost:4200
