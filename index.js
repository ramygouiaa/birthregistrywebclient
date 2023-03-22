const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 4000;

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
    res.render("403-forbidden");
  }
});

app.get("/birthact", (req, res) => {
    res.status(403).render("403-forbidden");
})

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

// Handle 404 errors
app.use(function(req, res, next) {
    res.status(404).render("404-not-found");

  });
  
  // Handle other errors
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
  console.log(`Birth act service client listening at http://localhost:${port}`);
});
