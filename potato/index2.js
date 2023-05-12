const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const app = express();

const CLIENT_ID = "604169960417-mp568kdm8o9jvu2iq72n5lrbgds6jam2.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:3000/redirect";

const oauth2Client = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
      <h1>Hello ${req.ip}</h1>
      <div style="background-color:pink;">Welcome to Home Page</div>
  `);
});

app.get("/auth/google/url", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
  });
  res.json({ authUrl });
});

app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
  });
  res.redirect(authUrl);
});

app.get("/redirect", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfoRes = await oauth2Client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    });

    res.send(userInfoRes.data);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});









