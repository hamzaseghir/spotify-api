const clientId = "92ade57dd3514375bcd6990adc441c4a"; // https://developer.spotify.com/ code fournit lors de la création de l'app
const redirectUri = encodeURI("http://localhost:5501/callback.html?"); // https://developer.spotify.com/dashboard/applications à définir dans le dashboard
const logging = document.querySelector("#loggin button"); 

let codeVerifier = null;
let codeChallenge = null;

codeVerifier = generateRandomString(128);
codeChallenge = generateCodeChallenge(codeVerifier);

logging.addEventListener('click', async() => {
    var authorizationUri = await codeChallenge.then(e => generateUri(e));
    window.location=authorizationUri;
});

 
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
};

async function generateUri(codeChallenge){
    var authorizationUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    return authorizationUri;
};

