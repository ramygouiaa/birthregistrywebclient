const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const jwt = require('jsonwebtoken');
const { expressjwt: ejwt } = require("express-jwt");
const uuid = require('uuid');

const app = express();

const viewsDirPath = path.join(__dirname, "templates", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", viewsDirPath);
app.use(express.static(path.join(__dirname, "public")));

const secretKey = uuid.v4();

// Set up a middleware function for bearer token authentication
const auth = ejwt({
secret: secretKey,
algorithms: ['HS256'],
getToken: (req) => {
if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
return req.headers.authorization.split(' ')[1];
}
return null;
}
});

// Endpoint to generate a JWT
app.get('/getauthtoken', (req, res) => {
  const userId = uuid.v4();
  const token = jwt.sign({ sub: userId }, secretKey, { expiresIn: '1h', algorithm: 'HS256' });
  res.json({ token });
});

app.get("/test", auth, (req, res) => {
  res.json({"message":"access granted!"})
});

app.get("/" ,(req, res) => {
  res.render("login");
});

app.post("/birthact", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("index", {
      username: name,
    });
  } else {
    res.render("failure");
  }
});

app.get("/repos", async (req, res) => {
  const username = req.query.username || "myogeshchavan97";
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    }));
    res.render("repos", {
      repos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting list of repositories");
  }
});

app.listen(3001, () => {
  console.log("server started on port 3000");
});
