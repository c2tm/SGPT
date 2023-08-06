import SgptDAO from "../dao/sgptDAO.js";
import crypto from 'crypto';
import querystring from 'querystring'
import axios from "axios";

export default class SgptController {
    static async apiPostPlaylist(req, res, next) {
        try {
            const user = req.body.user;
            const input = req.body.input;
            const id = req.body.id;
            const playlistResponse = await SgptDAO.addPlaylist(
                user,
                input,
                id,
            );
            res.json(playlistResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiSpotifyLogin(req, res) {
        try {
            var state = crypto.randomBytes(16).toString('hex');
            var scope = 'playlist-modify-public user-read-private user-read-email playlist-modify-private';
            var url = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state
            });
            res.json({ url: url });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiSpotifyToken(req, res, next) {
        try {
            var authOptions = {
                code: req.body.code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                grant_type: 'authorization_code' 
            };
            const headers = {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
              };
            axios({
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                data: authOptions,
                headers: headers
            }).then((response) => {
                res.send(response.data);
            }, (error) => {
                console.log(error);
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}