import SgptDAO from "../dao/sgptDAO.js";

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
}