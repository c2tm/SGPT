import express from 'express';
import SgptCtrl from "./sgpt.controller.js";
import SgptMiddlewares from './sgpt.middlewares.js';

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));

//Spotify routes
router.route("/playlist").post(SgptCtrl.apiPostPlaylist);
router.route("/login").get(SgptCtrl.apiSpotifyLogin);
router.route("/token").post(SgptCtrl.apiSpotifyToken);

//User routes
router.route("/users").get(SgptCtrl.apiGetUsers);
router.route("/users/:id").get(SgptMiddlewares.getUser, SgptCtrl.apiGetUser);
router.route("/users/:id").patch(SgptMiddlewares.getUser, SgptCtrl.apiEditUser);
router.route("/users/:id").delete(SgptMiddlewares.getUser, SgptCtrl.apiDeleteUser);
router.route("/users/new").post(SgptCtrl.apiCreateUser);

export default router;