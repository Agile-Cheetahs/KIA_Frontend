# KIA_Frontend
-  Kitchen Inventory Application frontend project for CS 536 course project.
- Using Capacitor + React + Vite
- Communicates with the API written in Django.

# Features
- Kitchen Inventory page
- Shopping list




# TODO
- Start with shopping list main page. 


# Setup
- Run `npm run dev` for starting the vite server that serves the front end on `http://localhost:3000/`.
- The `KIA_Backend` project also needs to be set up to interface with the API.
- By default this project talks to the API server on `http://localhost:8000/'. 
   -To change it go to the `vite.config.ts` config file and change the port number.

# Testing
- cypress tests can be run with
`cypress run test`


# API communication
- `https://danibazi9.pythonanywhere.com/` is the API endpoint of the Django server. For development this endpoint is the hostname for the proxy to connect to.
