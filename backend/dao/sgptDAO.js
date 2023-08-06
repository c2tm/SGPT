import mongodb from "mongodb";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const ObjectId = mongodb.ObjectId;
dotenv.config();
let sgpt;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
})

export default class SgptDAO {
    static async injectDB(conn) {
        if(!sgpt) {
            try {
                sgpt = await conn.db("playlist").collection("playlist");
            } catch (e) {
                console.error(`Unable to establish a collection handles in userDAO: ${e}`);
            }
        }
    }

    static async addPlaylist(username, input, id) {
        try {
            const openai = new OpenAIApi(configuration);
            const prompt = process.env.GPT_PROMPT;
            const message= prompt + " " + input;
            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-16k-0613",
                messages: [{"role": "user", "content": message}],
              });
            const playlistDoc = {
                id: id,
                user: username,
                playlist: JSON.parse(chatCompletion.data.choices[0].message.content),
            }
            // const playlistInsert = await sgpt.insertOne(playlistDoc);
            return chatCompletion.data.choices[0].message.content;
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.error("This is a syntax error:", e.message);
                return { error: "Syntax Error! ChatGPT Didn't like the prompt!", code: "syntax" };
              }
            console.error(`Unable to post playlist: ${e}`);
            return { error: e };
        }
    }
}