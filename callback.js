const queryString = window.location.hash.replace("#","?");
const urlParams = new URLSearchParams(queryString);
const access_token = urlParams.get('access_token');
sessionStorage.setItem("acces_token",access_token);
// avec regex
// const accesToken = window.location.hash.match(/?<=acces_token)([$&]*/)
window.location = "./main.html";