import express from 'express';
import SgptCtrl from "./sgpt.controller.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));
router.route("/playlist").post(SgptCtrl.apiPostPlaylist);
router.route("/login").get(SgptCtrl.apiSpotifyLogin);
router.route("/token").post(SgptCtrl.apiSpotifyToken);

export default router;