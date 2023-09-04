import express from 'express';
import SgptCtrl from "./sgpt.controller.js";
import SgptMiddlewares from './sgpt.middlewares.js';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/user.js';

const router = express.Router();

// passport.use(User.createStrategy());

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// });
// passport.deserializeUser((user, done) => {
//     User.findById(id, () => done(err, user));
// });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new Strategy(User.authenticate()));

router.route("/").get((req, res) => res.send("hello world"));

//Spotify routes
router.route("/playlist").post(SgptCtrl.apiPostPlaylist);
router.route("/login").get(SgptCtrl.apiSpotifyLogin);
router.route("/token").post(SgptCtrl.apiSpotifyToken);

//User routes
router.route("/users").get(SgptMiddlewares.getUserById, SgptCtrl.apiGetUsers);
router.route("/users/:id").get(SgptMiddlewares.getUserById, SgptCtrl.apiGetUser);
router.route("/users/:id").patch(SgptMiddlewares.getUserById, SgptCtrl.apiEditUser);
router.route("/users/:id").delete(SgptMiddlewares.getUserById, SgptCtrl.apiDeleteUser);
router.route("/users/new").post(SgptCtrl.apiCreateUser);
router.route("/users/login").post(SgptCtrl.apiLogInUser);
router.route("/users/login").post(SgptCtrl.apiLogOutUser);

export default router;