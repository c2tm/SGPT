import User from "./models/user.js";

export default class SgptMiddlewares {
    static async getUser(req, res, next) {
        let user;
        try {
            user = await User.findById(req.params.id);
            if(!user) {
                return res.status(404).json({ error: 'Cannot find user' })
            }
        } catch (e) {
            if(e.message.includes("Cast to ObjectId failed")) {
                return res.status(404).json({ error: 'Cannot find user' })
            }
            return res.status(500).json({ error: e.message });
        }
    
        res.user = user;
        next();
    }
}

