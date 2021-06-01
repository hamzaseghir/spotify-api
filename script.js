 function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

async function generateCodeChallenge(codeVerifier){
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const res = btoa(hash);
    return res;
}

const codeVerifier = generateRandomString(128);
const codeChallenge = generateCodeChallenge(codeVerifier);
const clientId = "92ade57dd3514375bcd6990adc441c4a";
const redirectUri = "http://localhost:5501/callback";


var authorizationUri = `https://accounts.spotify.com/authorize?client_id=${clientId}
                          &reponse_type=code&redirect_uri=${redirectUri}&code_challenge_method=256&code_challenge=${codeChallenge}`;