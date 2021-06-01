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
const clientId = "92ade57dd3514375bcd6990adc441c4a"; // https://developer.spotify.com/ code fournit lors de la création de l'app
const redirectUri = encodeURI("http://localhost:5501/callback"); // https://developer.spotify.com/dashboard/applications à définir dans le dashboard


var authorizationUri = `https://accounts.spotify.com/authorize?client_id=${clientId}
                          &response_type=token&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

var logging = document.querySelector("#loggin button");

logging.addEventListener('click', () => window.location=authorizationUri);