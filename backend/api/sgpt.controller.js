import SgptDAO from "../dao/sgptDAO.js";
import crypto from 'crypto';
import querystring from 'querystring'
import axios from "axios";
import User from './models/user.js';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export default class SgptController {

    static async apiGetUsers(req, res, next) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetUser(req, res, next) {
        try {
            res.json(res.user);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiCreateUser(req, res, next) {
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            await res.user.deleteOne();
            res.json({ message: "User successfully deleted" });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    static async apiEditUser(req, res, next) {
        const keys = Object.keys(req.body);
        for(let i = 0; i < keys.length; i++) {
            res.user[keys[i]] = req.body[keys[i]];
        }
        try {
            const updatedUser = await res.user.save();
            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

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
            const state = crypto.randomBytes(16).toString('hex');
            const scope = 'playlist-modify-public user-read-private user-read-email playlist-modify-private';
            const url = 'https://accounts.spotify.com/authorize?' +
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
            const authOptions = {
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