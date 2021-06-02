const addButtons = document.querySelectorAll('#results button');
const ulPlaylist = document.querySelector("#playlist ul");
const access_token = sessionStorage.getItem("acces_token");
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

const searchSong = () => {
    fetch("https://api.spotify.com/v1/search?q=")
}