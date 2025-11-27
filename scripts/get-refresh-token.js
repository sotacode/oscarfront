const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Read .env file manually
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const CLIENT_ID = envVars.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = envVars.GOOGLE_CLIENT_SECRET;
// Use the callback URL that is likely configured in Google Cloud Console
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';
console.log("-------")
console.log({ CLIENT_ID, CLIENT_SECRET, REDIRECT_URI });
if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Error: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in .env');
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const scopes = [
    'https://www.googleapis.com/auth/calendar' // Full calendar access (read + write)
];

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Critical for refresh token
    prompt: 'consent',      // Force consent to ensure refresh token is returned
    scope: scopes
});

console.log('\n--- Google Refresh Token Generator ---\n');
console.log('1. Visit this URL to authorize the app:');
console.log(url);
console.log('\n2. After authorizing, you will be redirected to your app (or an error page).');
console.log('3. Copy the "code" parameter from the URL in your browser address bar.');
console.log('   (e.g., http://localhost:3000/...?code=4/0A...)');
console.log('\nPaste the code here:');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('> ', async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('\n--- Success! ---\n');
        console.log('Add this to your .env file:');
        console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        console.log('\n(You can also see the access token, but it expires soon so rely on the refresh token)');
    } catch (error) {
        console.error('\nError retrieving access token:', error.message);
    }
    rl.close();
});
