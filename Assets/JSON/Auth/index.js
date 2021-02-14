const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const port = 3000;

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

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !name) {
    return res
      .status(400)
      .send("you need to provide a name, an email and a password.");
  }
  const newUser = {
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

app.listen(3000, () => {
  console.log("auth service is listening on 3000 port");
});
