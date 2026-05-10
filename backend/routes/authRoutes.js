const express = require("express");
const axios = require("axios");
const db = require("../db");
const router = express.Router();

router.get("/strava", (req, res) => {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri =
    process.env.STRAVA_REDIRECT_URI ||
    `${req.protocol}://${req.get("host")}/auth/strava/callback`;

  if (!clientId) {
    return res.status(500).send("Missing STRAVA_CLIENT_ID in .env");
  }

  const authURL =
    `https://www.strava.com/oauth/authorize?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&approval_prompt=force` +
    `&scope=read,activity:read_all`;

  res.redirect(authURL);
});

router.get("/strava/callback", async (req, res) => {
  const { code, error, error_description } = req.query;

  if (error) {
    return res.status(400).send(`Strava returned an error: ${error_description || error}`);
  }

  if (!code) {
    return res.status(400).send("Strava callback did not return an authorization code.");
  }

  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const redirectUri = process.env.STRAVA_REDIRECT_URI;

    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, athlete } = response.data;

    // Upsert user into DB
    await db.query(
      `INSERT INTO users (strava_id, name, access_token)
       VALUES ($1, $2, $3)
       ON CONFLICT (strava_id) DO UPDATE 
       SET access_token = $3`,
      [athlete.id, athlete.username, access_token]
    );

    // For now, just display the tokens. In production, store them securely.
    res.send(`
      <h1>Authorization Successful!</h1>
      <p>Access Token: ${access_token}</p>
      <p>Refresh Token: ${refresh_token}</p>
      <p>User ID: ${athlete.id}</p>
      <p>User saved to database.</p>
    `);
  } catch (err) {
    console.error("Error exchanging code for token:", err.response?.data || err.message);
    res.status(500).send("Failed to exchange authorization code for access token.");
  }
});

module.exports = router;
