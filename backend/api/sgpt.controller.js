import SgptDAO from "../dao/sgptDAO.js";
import crypto from 'crypto';
import querystring from 'querystring'

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
            var scope = 'playlist-modify-public';
            var url = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.CLIENT_ID,
                scope: scope,
                redirect_uri: 'http://127.0.0.1:3000',
                state: state
            });

            console.log(url);
            res.json({ url: url });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}