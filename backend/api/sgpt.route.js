import express from 'express';
import SgptCtrl from "./sgpt.controller.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));
router.route("/playlist").post(SgptCtrl.apiPostPlaylist);

export default router;