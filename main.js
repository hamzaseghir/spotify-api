const access_token = sessionStorage.getItem("acces_token");

const addButtons = document.querySelectorAll('#results button');
const ulPlaylist = document.querySelector("#playlist ul");
const searchBtn = document.querySelector("#search button");
const searchBar = document.querySelector("#search-input");
const result = document.querySelector("#results");
const resultSearch = document.querySelector("#results ul");
const playlistResult = document.querySelector("#playlist ul")
const saveButton = document.querySelector("#playlist button");
const playlistName = document.querySelector("#playlist input");
var searchQuery = null;


console.log(searchBtn);
console.log(access_token)
saveButton.addEventListener('click',() => savePlaylist());


searchBtn.addEventListener('click', async() => { 
    const resultLi = document.querySelectorAll("#results li");
    if(resultLi != null)
    resultLi.forEach(e => e.remove());
    const res = await Promise.resolve(searchSong().then(e => e.json()));
    const items = res.tracks.items;
    //console.log(items);  
    items.forEach(function(e){
        const button = document.createElement('button');
        button.innerText = " ### Ajouter";
        const uri = e.uri;
        const titre = e.name;
        var artist = "";
        const li = document.createElement('li');
        e.artists.forEach(e => artist+= e.name + " ");  
        var liCont = `${titre} - ${artist}`;
        li.setAttribute("data-uri", uri);
        li.append(liCont);
        const liToAdd = li.innerHTML;
        button.addEventListener('click', () => addToPlayList(liToAdd, uri));
        li.append(button);
        resultSearch.append(li);
    });
    result.style.display = "block";
});

function searchSong () {
    const options = {
        method: "GET",
        headers : {   
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        }
    }
    searchQuery = searchBar.value;
    
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, options);
}

function addToPlayList(track, uri){
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "*** Supprimer";
    deleteButton.addEventListener('click', () => playlistResult.removeChild(li));
    li.setAttribute("data-uri", uri);
    li.innerHTML = track;
    li.append(deleteButton);
    playlistResult.appendChild(li);
}

function addTracksToPlaylist(){
    const tracks = document.querySelectorAll("#playlist li");
    var res = []; 
    tracks.forEach(e => res.push(e.dataset.uri));
}

function getUser(){
    const options = {
        method : "GET",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${access_token}`,
        }
    }
    return fetch('https://api.spotify.com/v1/me', options).then(e => e.json());
}

function createPlaylist(){
    const name = JSON.stringify(playlistName.innerHTML != null ? playlistName.innerHTML : "😎 Bangers");
    const options = {
        method : "POST",

        body : {
            "name" : name,
            "description" : "Generated with an awesome website",
            "public" : true,
        },

        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${access_token}`,
        },
    }
    const userId = getUser().then(e => e.id);
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`).then(e => e.json());
}

function savePlaylist(){
    const idPlaylist = createPlaylist().then(e => e.id);
    const tracks = JSON.stringify(addTracksToPlaylist());
    const options = {
        method : "POST",
        uris: tracks,
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${access_token}`,
        },
    };
    fetch(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`);
}