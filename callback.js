const queryString = window.location.hash.replace("#","?");
const urlParams = new URLSearchParams(queryString);
const access_token = urlParams.get('access_token');
sessionStorage.setItem("acces_token",access_token);
window.location = "/main.html";