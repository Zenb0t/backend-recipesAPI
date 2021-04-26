const express = require('express')
const path = require("path");
const database = require('./database');
const bodyParser = require('body-parser')
const app = express()
const ingredientRouter = require('./routes/ingredientRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

// Session Configuration

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
} 

// Passport Configuration

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
);

// App Config

//parse req of type JSON
app.use(bodyParser.json());

//parse req of type URL
app.use(bodyParser.urlencoded({ extended: true }))

//Init session middleware
app.use(expressSession(session));

//Config passport and user Serialization
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

app.use(userRouter);
app.use(ingredientRouter);
app.use(recipeRouter);
