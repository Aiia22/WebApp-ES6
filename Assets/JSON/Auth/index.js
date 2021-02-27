const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const port = 3000;
const accessTokenSecret = "tatianarules";
const { v4: uuidv4 } = require("uuid");
uuidv4();

//post ---> login
app.post("/connect", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const rawData = fs.readFileSync("userData.json");
  const users = JSON.parse(rawData).users;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, tier: user.tier, level: user.level },
      accessTokenSecret
    );

    return res.send({
      accessToken,
    });
  }
  return res.send("Invalid username or password...");
});

//post ---> Register
app.post("/register", (req, res) => {
  const userId = uuidv4();
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !name) {
    return res
      .status(400)
      .send("you need to provide a name, an email and a password.");
  }

  const newUser = {
    userId: userId,
    name: name,
    email: email,
    password: password,
    level: "novice",
    tier: "free",
  };

  const rawData = fs.readFileSync("userData.json");
  const data = JSON.parse(rawData);

  data.users.push(newUser);

  fs.writeFileSync("userData.json", JSON.stringify(data));
  return res.status(202).send(newUser);
});

//Get ---->
app.get("/:userId", (req, res) => {
  const rawData = fs.readFileSync("userData.json");
  const users = JSON.parse(rawData).users;

  const user = users.find((u) => u.userId === req.params.userId);
  if (!user) {
    return res.status(400).send("invalid userId");
  }
  return res.send(user);
});

//Put ---->
app.put("/:userId", (req, res) => {
  const rawData = fs.readFileSync("userData.json");
  const data = JSON.parse(rawData);

  const user = data.users.find((u) => u.userId === req.params.userId);
  if (!user) {
    return res.status(400).send("invalid userId");
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.level = req.body.level;
  user.tier = req.body.tier;
  user.password = req.body.password;

  fs.writeFileSync("userData.json", JSON.stringify(data));
  return res.status(202).send(user);
});

//Delete ------->
app.delete("/:userId", (req, res) => {
  const rawData = fs.readFileSync("userData.json");
  const data = JSON.parse(rawData);

  const user = data.users.findIndex((u) => u.userId === req.params.userId);
  if (user === -1) {
    return res.status(400).send("invalid userId");
  }
  data.users.splice(user, 1);
  fs.writeFileSync("userData.json", JSON.stringify(data));
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(3000, () => {
  console.log("auth service is listening on 3000 port");
});
