const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const busboy = require('connect-busboy'); 
const path = require("path");

const authRoute = require("./routes/public/auth.route");
const adminRoute = require("./routes/private/admin.route");
const { startServer } = require("./database/mongo.connection");
const subadminRoute = require("./routes/private/subadmin.route");
const videoRoute = require("./routes/private/video.route");
const htmlRoute = require("./routes/public/htmlPage.route");

/************ MIDDLEWARES *************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/docs", express.static("public"));

/************ ROUTES *************/

app.use("/api/user", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/subadmin", subadminRoute);

app.use(busboy({ highWaterMark: 2 * 1024 * 1024,})) // Set 2MiB buffer

app.use("/api/video", videoRoute);
app.use('/', htmlRoute);

app.listen(PORT, async () => {
  await startServer();
  console.log(`server start listening on port ${PORT}`);
});



