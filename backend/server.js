import express from "express";
import cors from 'cors';
import router from "./api/sgpt.route.js";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/sgpt", router);
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;