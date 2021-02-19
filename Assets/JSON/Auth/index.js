const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const port = 3000;
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
    return res.send({ name: user.name, level: user.level, tier: user.tier });
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
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send("invalid userId");
  }
  return res.status(202).send("Received a GET HTTP method");
});

//Put ---->
app.put("/:userId/update", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("invalid userId");
  }
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/delete", (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("invalid userId");
  }
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(3000, () => {
  console.log("auth service is listening on 3000 port");
});
