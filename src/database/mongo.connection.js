const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.DB_CONNECT;

async function startServer() {
  await mongoose.connect(MONGO_URL);
}

mongoose.connection.once("open", () => {
  console.log("MongoDb Connection ready");
});

mongoose.connection.on("error", (err) => {
  console.log(`${err}`);
});

module.exports = {
  startServer,
};
