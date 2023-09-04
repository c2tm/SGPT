import app from "./server.js";
// import mongodb from "mongodb";
import mongoose from 'mongoose';
import dotenv from "dotenv";
// import SgptDAO from "./dao/sgptDAO.js";

dotenv.config();

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.admcewa.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT;

// Saving - Connects to MongoDB server without mongoose
// const MongoClient = mongodb.MongoClient;

// MongoClient.connect(
//     uri,
//     {
//         maxPoolSize: 50,
//         wtimeoutMS: 2500,
//         useNewUrlParser: true
//     }
// )
// .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
// })
// .then(async client => {
//     await SgptDAO.injectDB(client);
//     app.listen(port, () => {
//         console.log(`listening on port ${port}`)
//     })
// })

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
})
db.once('open', () => {
    console.log('Connected to Database')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
