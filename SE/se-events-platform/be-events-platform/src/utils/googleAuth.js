const { google } = require('googleapis');
const { getGoogleRefreshToken } = require('../models/userModel');

const createOAuthClient = async (user_id) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  // Fetch the user's refresh token from the database
  const refreshToken = await getGoogleRefreshToken(user_id);

  if (!refreshToken) {
    throw new Error('No Google refresh token found for this user');
  }

  // Set the credentials
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return oauth2Client;
};

module.exports = { createOAuthClient };
