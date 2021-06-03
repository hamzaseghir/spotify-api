const access_token = sessionStorage.getItem("acces_token");

const addButtons = document.querySelectorAll('#results button');
const ulPlaylist = document.querySelector("#playlist ul");
const searchBtn = document.querySelector("#search button");
const searchBar = document.querySelector("#search-input");
const result = document.querySelector("#results");
const resultSearch = document.querySelector("#results ul");
const playlistResult = document.querySelector("#playlist ul")
const saveButton = document.querySelector("#playlist button");
var searchQuery = null;


console.log(searchBtn);
console.log(access_token)

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const li = document.createElement('li');
        const liText = document.createTextNode(`${button.dataset.artist} - ${button.dataset.song}`);
        li.append(liText);
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', () => {
            li.remove();
        })
        const btnText = document.createTextNode('Supprimer');
        deleteButton.append(btnText);
        li.append(deleteButton);
        ulPlaylist.append(li);
    })
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

searchBtn.addEventListener('click', async() => { 
    const resultLi = document.querySelectorAll("#results li");
    if(resultLi != null)
    resultLi.forEach(e => e.remove());
    const res = await Promise.resolve(searchSong().then(e => e.json()));
    const items = res.tracks.items;
    console.log(items);
    items.forEach(function(e){
        const uri = e.uri;
        const titre = e.name;
        var artist = "";
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = " # Ajouter";
        e.artists.forEach(e => artist+= e.name + " ");
        var liCont = `${titre} - ${artist}`;
        li.setAttribute("data-uri", uri);
        li.append(liCont);
        li.append(button);
        button.addEventListener('click', addToPlayList(li));
        resultSearch.append(li);
    });
    result.style.display = "block";
});

function addToPlayList(track){
    playlistResult.append(track);
    console.log(track);
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

getUser().then(e => console.log(e));

function createPlaylist(name){
    const options = {
        method = "POST",
        data : {
            "name" : name,
            "description" : "Generated with an awesome website",
            "public" : true,
        },
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${access_token}`
        }
    }
    const userId = getUser().id;
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`).then(e => e.json());
}

function addTracksToPlaylist(tracks){
    
}