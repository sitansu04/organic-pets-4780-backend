const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const { Usermodel } = require("./models/user.model.js");

const {
  notifyBeforeRouter,
} = require("./workflows/route/notifyBeforeEvent.route.js");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(notifyBeforeRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  try {
    res.send("Welcome to calendly");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   async function (req, res) {
//     const name = req.user._json.name;
//     const email = req.user._json.email;
//     const pro_pic = req.user._json.picture;
//     const user_data = {
//       name,
//       email,
//       picture: pro_pic,
//     };
//     const user = new Usermodel(user_data);
//     await user.save();
//     res.cookie("userEmail", email);
//     res.redirect("https://calendly.com/event_types/user/me");
//   }
// );

app.get("/userEmail", async (req, res) => {
  try {
    res.send({
      email: req.cookies.userEmail,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4500, async () => {
  try {
    connection;
    console.log(`Connected to db`);
    console.log(`Server Rocking in port 4500`);
  } catch (error) {
    console.log(error);
  }
});
