const express = require("express");
const dbHandle = require("./config/db");
const profileRouter = require("./ROUTES/API/ProfileRoute");
const cors = require("cors");
const userRouter = require("./ROUTES/API/UserRoute");
const postRouter = require("./ROUTES/API/PostRoute");
const authRouter = require("./ROUTES/API/AuthRoute");

const app = express();

// initializing db Instance...
dbHandle();

// middleWare to Accept Request Body json
app.use(express.json());
app.use(cors());

// Route Invoke
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("Server Successfully running on port 5000");
});
