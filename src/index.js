const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

const authRoute = require("./routes/public/auth.route");
const adminRoute = require("./routes/private/admin.route");
const commonRoute = require("./routes/public/common.route");
const subAdminRoute = require("./routes/private/subAdmin.route");
const jobPosterRoute = require("./routes/private/jobPoster.route");
const { startServer } = require("./database/mongo.connection");

/************ MIDDLEWARES *************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/docs", express.static("public"));

/************ ROUTES *************/

app.use("/api/user", authRoute);
app.use("/api/admin", adminRoute);

// app.use("/api/common", commonRoute);
// app.use("/api/subAdmin", subAdminRoute);
// app.use("/api/jobPoster", jobPosterRoute);

// listen to the port
app.listen(PORT, async () => {
  await startServer();
  console.log(`server start listening on port ${PORT}`);
});
